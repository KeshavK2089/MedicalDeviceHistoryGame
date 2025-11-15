import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Clock, GraduationCap, DollarSign, Users } from "lucide-react";

interface ImagingRoboticsVisualProps {
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

const choices = [
  {
    id: "scan",
    label: "Approve the Scan",
    icon: Scan,
    cost: "High",
    benefit: "High Certainty",
    access: "Limited",
    description: "Rule out serious conditions"
  },
  {
    id: "wait",
    label: "Watchful Waiting",
    icon: Clock,
    cost: "Low",
    benefit: "Delayed Diagnosis",
    access: "Preserved",
    description: "Clinical exam first"
  },
  {
    id: "protocol",
    label: "Evidence-Based Protocol",
    icon: GraduationCap,
    cost: "Medium",
    benefit: "Balanced",
    access: "Fair",
    description: "Follow guidelines strictly"
  }
];

const outcomes = {
  scan: "Nothing abnormal found. Patient reassured, but healthcare costs rose. Was it necessary?",
  wait: "Resources conserved. Most cases resolved, but some conditions caught later than optimal.",
  protocol: "Balanced approach worked. Most patients got appropriate care with controlled costs."
};

export function ImagingRoboticsVisual({ onChoice, selectedChoice }: ImagingRoboticsVisualProps) {
  const [selected, setSelected] = useState<string | null>(selectedChoice || null);
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  useEffect(() => {
    setSelected(selectedChoice || null);
  }, [selectedChoice]);

  const handleChoice = (choiceId: string) => {
    if (selected) return;
    setSelected(choiceId);
    onChoice(choiceId);
  };

  const activeChoice = choices.find(c => c.id === (selected || hoveredChoice)) || choices[1];

  return (
    <Card className="p-8 border-2 border-teal-500/30 bg-gradient-to-br from-background via-teal-950/10 to-background" data-testid="card-imaging-ethical">
      <div className="text-center mb-6">
        <h3 className="font-grotesk font-bold text-2xl mb-2">MRI Access Dilemma</h3>
        <p className="text-muted-foreground">
          Patient with vague symptoms requests expensive MRI scan
        </p>
      </div>

      {/* Cost-Benefit Matrix Visualization */}
      <div className="mb-8 relative h-64 bg-secondary/20 rounded-lg p-6">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
          {/* Quadrant Labels */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
            High Benefit
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
            Low Benefit
          </div>
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-xs text-muted-foreground -rotate-90">
            High Cost
          </div>
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-xs text-muted-foreground -rotate-90">
            Low Cost
          </div>

          {/* Quadrants */}
          <div className="border-2 border-yellow-500/50 rounded-lg flex items-center justify-center bg-yellow-500/5 relative">
            <DollarSign className="w-8 h-8 text-yellow-500 opacity-50" />
            {activeChoice.id === "scan" && (
              <div className="absolute inset-0 border-4 border-teal-400 rounded-lg animate-pulse" />
            )}
          </div>
          <div className="border-2 border-green-500/50 rounded-lg flex items-center justify-center bg-green-500/5 relative">
            <Users className="w-8 h-8 text-green-500 opacity-50" />
            {activeChoice.id === "protocol" && (
              <div className="absolute inset-0 border-4 border-teal-400 rounded-lg animate-pulse" />
            )}
          </div>
          <div className="border-2 border-red-500/50 rounded-lg flex items-center justify-center bg-red-500/5">
            <span className="text-xs text-muted-foreground">Wasteful</span>
          </div>
          <div className="border-2 border-blue-500/50 rounded-lg flex items-center justify-center bg-blue-500/5 relative">
            <Clock className="w-8 h-8 text-blue-500 opacity-50" />
            {activeChoice.id === "wait" && (
              <div className="absolute inset-0 border-4 border-teal-400 rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-sm font-semibold text-teal-400">{activeChoice.cost}</div>
          <div className="text-xs text-muted-foreground mt-1">Cost Impact</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-sm font-semibold text-teal-400">{activeChoice.benefit}</div>
          <div className="text-xs text-muted-foreground mt-1">Diagnostic Value</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-sm font-semibold text-teal-400">{activeChoice.access}</div>
          <div className="text-xs text-muted-foreground mt-1">Resource Access</div>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {choices.map((choice) => {
          const Icon = choice.icon;
          const isSelected = selected === choice.id;
          return (
            <Button
              key={choice.id}
              variant={isSelected ? "default" : "outline"}
              className="h-auto flex-col py-6 gap-3"
              onClick={() => handleChoice(choice.id)}
              onMouseEnter={() => !selected && setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              disabled={!!selected}
              data-testid={`button-imaging-${choice.id}`}
            >
              <Icon className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">{choice.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{choice.description}</div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Outcome Display */}
      {selected && (
        <Card className="p-6 bg-teal-500/10 border-teal-500/30 animate-slide-up" data-testid="card-imaging-outcome">
          <h4 className="font-semibold mb-2 text-teal-400">Historical Outcome</h4>
          <p className="text-sm leading-relaxed">{outcomes[selected as keyof typeof outcomes]}</p>
        </Card>
      )}
    </Card>
  );
}
