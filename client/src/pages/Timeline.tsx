import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/hooks/use-progress";
import { ProgressTracker } from "@/components/ProgressTracker";
import { eras } from "@shared/schema";
import { Lock, CheckCircle2, ChevronRight, Home, Info, Trophy, Microscope, Zap, Bot, Watch, Dna } from "lucide-react";

const iconMap: Record<string, any> = {
  Microscope,
  Zap,
  Bot,
  Watch,
  Dna
};

export default function Timeline() {
  const [, setLocation] = useLocation();
  const { progress, completionPercentage, isEraUnlocked } = useProgress();

  const getEraIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent;
  };

  const colorClasses = {
    cyan: "border-cyan-500/40 bg-cyan-500/5 hover:border-cyan-500/60 shadow-cyan-500/20",
    purple: "border-purple-500/40 bg-purple-500/5 hover:border-purple-500/60 shadow-purple-500/20",
    teal: "border-teal-500/40 bg-teal-500/5 hover:border-teal-500/60 shadow-teal-500/20"
  };

  const glowClasses = {
    cyan: "shadow-cyan-500/30",
    purple: "shadow-purple-500/30",
    teal: "shadow-teal-500/30"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <ProgressTracker />
      
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-grotesk font-bold text-2xl tracking-tight" data-testid="text-timeline-title">
                Journey Timeline
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {completionPercentage}% Complete
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/achievements")}
                data-testid="button-achievements"
              >
                <Trophy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/")}
                data-testid="button-home"
              >
                <Home className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/about")}
                data-testid="button-about"
              >
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl mb-4">
            Five Eras of Innovation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Travel through time and explore the evolution of medical devices. 
            Complete each era to unlock the next chapter.
          </p>
        </div>

        {/* Era Cards */}
        <div className="space-y-6">
          {eras.map((era, index) => {
            const unlocked = isEraUnlocked(era.id);
            const completed = progress.completedEras.includes(era.id);
            
            return (
              <div 
                key={era.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card 
                  className={`p-6 border-2 shadow-xl transition-all duration-300 ${
                    unlocked 
                      ? `${colorClasses[era.color as keyof typeof colorClasses]} cursor-pointer hover-elevate active-elevate-2` 
                      : 'opacity-50 border-border bg-card cursor-not-allowed'
                  } ${completed ? glowClasses[era.color as keyof typeof glowClasses] : ''}`}
                  onClick={() => unlocked && setLocation(`/era/${era.slug}`)}
                  data-testid={`card-era-${era.id}`}
                >
                  <div className="flex items-start gap-6">
                    {/* Era Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                        completed 
                          ? 'bg-primary/20 border-primary' 
                          : unlocked 
                            ? 'bg-card border-border' 
                            : 'bg-muted border-border'
                      }`}>
                        {completed ? (
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        ) : unlocked ? (
                          (() => {
                            const IconComponent = getEraIcon(era.iconName);
                            return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
                          })()
                        ) : (
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Era Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs uppercase tracking-wide">
                          Era {era.order}
                        </Badge>
                        {completed && (
                          <Badge className="text-xs">Completed</Badge>
                        )}
                        {!unlocked && (
                          <Badge variant="secondary" className="text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-grotesk font-bold text-xl md:text-2xl mb-2" data-testid={`text-era-name-${era.id}`}>
                        {era.name}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {era.intro}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {era.devices.length} Devices
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          1 Mission
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Ethical Challenge
                        </Badge>
                      </div>
                    </div>

                    {/* Arrow */}
                    {unlocked && (
                      <div className="flex-shrink-0">
                        <ChevronRight className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Lab Sandbox CTA */}
        <div className="mt-12 animate-fade-in">
          <Card className="p-8 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-teal-500/10 border-2 border-purple-500/30 shadow-xl text-center">
            <h3 className="font-grotesk font-bold text-2xl mb-3">
              Visit the Innovation Lab
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Experiment with device building blocks and create your own fictional medical innovations
            </p>
            <Button
              size="lg"
              onClick={() => setLocation("/lab")}
              data-testid="button-lab"
            >
              Enter Lab Sandbox
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
