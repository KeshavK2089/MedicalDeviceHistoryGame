import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProgress } from "@/hooks/use-progress";
import { ProgressTracker } from "@/components/ProgressTracker";
import { DeviceCard } from "@/components/DeviceCard";
import { ChoiceScenario } from "@/components/ChoiceScenario";
import { SequencingPuzzle } from "@/components/SequencingPuzzle";
import { ParameterSlider } from "@/components/ParameterSlider";
import { eras } from "@shared/schema";
import { ArrowLeft, CheckCircle2, Microscope, Zap, Bot, Watch, Dna } from "lucide-react";

const iconMap: Record<string, any> = {
  Microscope,
  Zap,
  Bot,
  Watch,
  Dna
};

export default function EraView() {
  const [, params] = useRoute("/era/:slug");
  const [, setLocation] = useLocation();
  const { progress, completeEra, saveChoice, setCurrentEra, isEraUnlocked, recordMissionAttempt, recordEraStart } = useProgress();
  const [introVisible, setIntroVisible] = useState(true);
  const [missionComplete, setMissionComplete] = useState(false);

  const era = eras.find(e => e.slug === params?.slug);

  // Derived state - must be before early returns to satisfy hooks rules
  const isEraComplete = era ? progress.completedEras.includes(era.id) : false;
  const hasChoice = era ? progress.eraChoices[era.id] : undefined;

  // First useEffect - manages intro and initial mission state
  useEffect(() => {
    if (era) {
      setCurrentEra(era.id);
      recordEraStart(era.id);
      const completed = progress.completedEras.includes(era.id);
      setMissionComplete(completed);
      
      // Hide intro after 3 seconds if not already completed
      if (!completed) {
        const timer = setTimeout(() => setIntroVisible(false), 4000);
        return () => clearTimeout(timer);
      } else {
        setIntroVisible(false);
      }
    }
  }, [era, progress.completedEras, setCurrentEra, recordEraStart]);

  // Second useEffect - completes era when both conditions are met
  useEffect(() => {
    if (era && missionComplete && hasChoice && !isEraComplete) {
      completeEra(era.id);
    }
  }, [era, missionComplete, hasChoice, isEraComplete, completeEra]);

  // Early returns after all hooks
  if (!era) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Era not found</p>
          <Button onClick={() => setLocation("/timeline")} className="mt-4">
            Back to Timeline
          </Button>
        </Card>
      </div>
    );
  }

  if (!isEraUnlocked(era.id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="font-grotesk font-bold text-2xl mb-4">Era Locked</h2>
          <p className="text-muted-foreground mb-6">
            Complete previous eras to unlock this one.
          </p>
          <Button onClick={() => setLocation("/timeline")}>
            Back to Timeline
          </Button>
        </Card>
      </div>
    );
  }

  // Handler functions - after early returns is OK
  const handleMissionComplete = () => {
    setMissionComplete(true);
  };

  const handleEthicalChoice = (choiceId: string) => {
    saveChoice(era.id, choiceId);
  };

  const handleMissionAttempt = () => {
    if (era) {
      recordMissionAttempt(era.id);
    }
  };

  const colorClasses = {
    cyan: "from-cyan-500/20 via-purple-500/20 to-teal-500/20",
    purple: "from-purple-500/20 via-cyan-500/20 to-purple-500/20",
    teal: "from-teal-500/20 via-cyan-500/20 to-teal-500/20"
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressTracker />

      {/* Hero Section with Intro */}
      {introVisible && (
        <div className={`min-h-[50vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${colorClasses[era.color as keyof typeof colorClasses]}`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="mb-6 animate-fade-in flex justify-center" data-testid={`text-era-icon-${era.id}`}>
              {(() => {
                const IconComponent = iconMap[era.iconName];
                return IconComponent ? <IconComponent className="w-16 h-16 md:w-20 md:h-20" /> : null;
              })()}
            </div>
            <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-6 animate-slide-up" data-testid={`text-era-title-${era.id}`}>
              {era.name}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {era.intro}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/timeline")}
            data-testid="button-back-timeline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Timeline
          </Button>
          {isEraComplete && (
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Era Complete</span>
            </div>
          )}
        </div>

        {/* Context */}
        <Card className="p-6 mb-12 border-2 border-border">
          <p className="text-foreground leading-relaxed" data-testid={`text-era-context-${era.id}`}>
            {era.context}
          </p>
        </Card>

        {/* Devices Section */}
        <div className="mb-12">
          <h2 className="font-grotesk font-bold text-2xl md:text-3xl mb-6">
            Key Innovations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {era.devices.map((device) => (
              <DeviceCard key={device.id} device={device} eraColor={era.color} />
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="font-grotesk font-bold text-2xl md:text-3xl mb-6">
            Mission Challenge
          </h2>
          {era.mission.type === "sequence" && (
            <SequencingPuzzle
              title={era.mission.title}
              description={era.mission.description}
              items={era.mission.data.items}
              onComplete={handleMissionComplete}
              eraId={era.id}
              onAttempt={handleMissionAttempt}
            />
          )}
          {era.mission.type === "slider" && (
            <ParameterSlider
              title={era.mission.title}
              description={era.mission.description}
              min={era.mission.data.min}
              max={era.mission.data.max}
              optimal={era.mission.data.optimal}
              initial={era.mission.data.initial}
              unit={era.mission.data.unit}
              onComplete={handleMissionComplete}
              eraId={era.id}
              onAttempt={handleMissionAttempt}
            />
          )}
          {era.mission.type === "choice" && (
            <ChoiceScenario
              title={era.mission.title}
              description={era.mission.description}
              choices={era.mission.data.choices}
              onChoice={handleMissionComplete}
              selectedChoice={missionComplete ? "selected" : undefined}
              eraId={era.id}
              onAttempt={handleMissionAttempt}
            />
          )}
        </div>

        <Separator className="my-12" />

        {/* Ethical Question */}
        <div className="mb-12">
          <h2 className="font-grotesk font-bold text-2xl md:text-3xl mb-6">
            Ethical Reflection
          </h2>
          <ChoiceScenario
            title="Consider This..."
            description={era.ethicalQuestion.question}
            choices={era.ethicalQuestion.choices}
            onChoice={handleEthicalChoice}
            selectedChoice={hasChoice}
          />
        </div>

        {/* Next Era Button */}
        {isEraComplete && (
          <div className="text-center mt-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/30">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-grotesk font-bold text-2xl mb-3">
                Era Complete!
              </h3>
              <p className="text-muted-foreground mb-6">
                You've mastered the {era.name}. Continue your journey through time.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation("/timeline")}
                data-testid="button-continue-journey"
              >
                Continue Journey
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
