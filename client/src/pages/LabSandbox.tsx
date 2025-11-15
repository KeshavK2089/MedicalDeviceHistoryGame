import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react";

interface BuildingBlock {
  id: string;
  type: "sensor" | "actuator" | "algorithm" | "power";
  name: string;
  description: string;
}

const buildingBlocks: BuildingBlock[] = [
  // Sensors
  { id: "glucose-sensor", type: "sensor", name: "Glucose Sensor", description: "Measures blood glucose levels" },
  { id: "pressure-sensor", type: "sensor", name: "Pressure Sensor", description: "Detects blood pressure changes" },
  { id: "ecg-sensor", type: "sensor", name: "ECG Sensor", description: "Monitors heart electrical activity" },
  { id: "oxygen-sensor", type: "sensor", name: "Oxygen Sensor", description: "Measures blood oxygen saturation" },
  
  // Actuators
  { id: "insulin-pump", type: "actuator", name: "Insulin Pump", description: "Delivers precise insulin doses" },
  { id: "stimulator", type: "actuator", name: "Neural Stimulator", description: "Electrical nerve stimulation" },
  { id: "drug-release", type: "actuator", name: "Drug Release Module", description: "Controlled medication delivery" },
  { id: "haptic-feedback", type: "actuator", name: "Haptic Feedback", description: "Provides tactile responses" },
  
  // Algorithms
  { id: "ml-predictor", type: "algorithm", name: "ML Predictor", description: "Machine learning predictions" },
  { id: "pid-controller", type: "algorithm", name: "PID Controller", description: "Closed-loop control system" },
  { id: "pattern-detector", type: "algorithm", name: "Pattern Detector", description: "Identifies physiological patterns" },
  { id: "risk-calculator", type: "algorithm", name: "Risk Calculator", description: "Calculates health risk scores" },
  
  // Power
  { id: "battery", type: "power", name: "Battery", description: "Rechargeable lithium battery" },
  { id: "wireless-charge", type: "power", name: "Wireless Charging", description: "Inductive power transfer" },
  { id: "biofuel-cell", type: "power", name: "Biofuel Cell", description: "Glucose-powered energy" },
  { id: "piezo", type: "power", name: "Piezoelectric", description: "Motion-harvested power" }
];

const typeColors = {
  sensor: "cyan",
  actuator: "purple",
  algorithm: "teal",
  power: "yellow"
};

const typeLabels = {
  sensor: "Sensor",
  actuator: "Actuator",
  algorithm: "Algorithm",
  power: "Power"
};

export default function LabSandbox() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<Record<string, BuildingBlock | null>>({
    sensor: null,
    actuator: null,
    algorithm: null,
    power: null
  });
  const [generated, setGenerated] = useState<{ name: string; description: string } | null>(null);

  const handleSelect = (block: BuildingBlock) => {
    setSelected(prev => ({
      ...prev,
      [block.type]: prev[block.type]?.id === block.id ? null : block
    }));
    setGenerated(null);
  };

  const handleGenerate = () => {
    const selectedBlocks = Object.values(selected).filter(Boolean) as BuildingBlock[];
    if (selectedBlocks.length < 2) return;

    // Generate fictional device name and description
    const combinations = [
      { 
        name: "NeuroSync Regulator", 
        description: "A breakthrough device that monitors neural patterns and delivers targeted electrical stimulation to optimize brain function and mood stability."
      },
      { 
        name: "BioLoop Optimizer", 
        description: "An intelligent closed-loop system that continuously analyzes physiological signals and automatically adjusts therapeutic interventions in real-time."
      },
      { 
        name: "Smart Metabolic Guardian", 
        description: "An advanced monitoring and control system that predicts metabolic events before they occur and preemptively delivers corrective therapy."
      },
      { 
        name: "Adaptive Wellness Implant", 
        description: "A fully integrated device that learns from your body's patterns and adapts its therapeutic approach to your unique physiology over time."
      },
      { 
        name: "Precision Health Navigator", 
        description: "A multi-modal device combining continuous monitoring with AI-driven decision support to guide personalized treatment strategies."
      },
      { 
        name: "CyberMed Interface", 
        description: "A next-generation medical device that bridges biological systems with advanced computing to enable unprecedented levels of health optimization."
      }
    ];

    const randomDevice = combinations[Math.floor(Math.random() * combinations.length)];
    setGenerated(randomDevice);
  };

  const handleReset = () => {
    setSelected({
      sensor: null,
      actuator: null,
      algorithm: null,
      power: null
    });
    setGenerated(null);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <ProgressTracker />

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setLocation("/timeline")}
              data-testid="button-back-timeline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timeline
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              data-testid="button-reset-lab"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-4" data-testid="text-lab-title">
            Innovation Lab
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Mix and match device components to create fictional medical innovations. 
            Select building blocks from each category and generate your creation.
          </p>
        </div>

        {/* Building Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(["sensor", "actuator", "algorithm", "power"] as const).map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="font-grotesk font-bold text-lg uppercase tracking-wide flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${typeColors[type]}-500`} />
                {typeLabels[type]}s
              </h3>
              <div className="space-y-2">
                {buildingBlocks
                  .filter(b => b.type === type)
                  .map((block) => {
                    const isSelected = selected[type]?.id === block.id;
                    return (
                      <Card
                        key={block.id}
                        className={`p-4 cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-2 border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                            : 'border hover-elevate active-elevate-2'
                        }`}
                        onClick={() => handleSelect(block)}
                        data-testid={`card-block-${block.id}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm mb-1 truncate">{block.name}</p>
                            <p className="text-xs text-muted-foreground">{block.description}</p>
                          </div>
                          {isSelected && (
                            <Badge variant="default" className="text-xs flex-shrink-0">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Generate Section */}
        <Card className="p-8 border-2 border-primary/30 shadow-xl">
          <div className="text-center">
            <h3 className="font-grotesk font-bold text-2xl mb-4">
              Device Generator
            </h3>
            <p className="text-muted-foreground mb-6">
              Selected {selectedCount} of 4 components. Choose at least 2 to generate a device.
            </p>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={selectedCount < 2}
              data-testid="button-generate-device"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Device
            </Button>
          </div>

          {generated && (
            <div className="mt-8 p-6 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-teal-500/10 rounded-lg border-2 border-primary/30 animate-slide-up" data-testid="card-generated-device">
              <div className="text-center">
                <Badge className="mb-4 text-xs uppercase tracking-wide">
                  Generated Innovation
                </Badge>
                <h4 className="font-grotesk font-bold text-2xl md:text-3xl mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  {generated.name}
                </h4>
                <p className="text-foreground leading-relaxed max-w-2xl mx-auto">
                  {generated.description}
                </p>
                
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {Object.values(selected).filter(Boolean).map((block) => (
                    <Badge 
                      key={block!.id} 
                      variant="outline"
                      className="text-xs"
                    >
                      {block!.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Info Note */}
        <Card className="mt-8 p-6 bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Note:</strong> All generated devices are fictional and for educational purposes only. 
            Real medical device development requires extensive research, testing, and regulatory approval.
          </p>
        </Card>
      </div>
    </div>
  );
}
