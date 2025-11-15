import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Activity } from "lucide-react";

interface FoundationsVisualProps {
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

const choices = [
  {
    id: "safety",
    label: "Pause Until Safe",
    icon: Shield,
    color: "bg-green-500",
    riskLevel: 0,
    description: "Prioritize operator safety over rapid deployment"
  },
  {
    id: "proceed",
    label: "Proceed with Warnings",
    icon: AlertTriangle,
    color: "bg-yellow-500",
    riskLevel: 50,
    description: "Balance innovation with cautious warnings"
  },
  {
    id: "restrict",
    label: "Life-Threatening Only",
    icon: Activity,
    color: "bg-orange-500",
    riskLevel: 25,
    description: "Restrict use to critical cases"
  }
];

const outcomes = {
  safety: "Safety first approach built long-term trust. Adoption slowed, but operator protection was ensured.",
  proceed: "Lives saved through rapid diagnosis, but many operators suffered radiation injuries.",
  restrict: "Balanced approach: slower evolution but fewer casualties."
};

export function FoundationsVisual({ onChoice, selectedChoice }: FoundationsVisualProps) {
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

  const activeChoice = choices.find(c => c.id === (selected || hoveredChoice));
  const riskLevel = activeChoice?.riskLevel ?? 0;

  return (
    <Card className="p-8 border-2 border-cyan-500/30 bg-gradient-to-br from-background via-cyan-950/10 to-background" data-testid="card-foundations-ethical">
      <div className="text-center mb-6">
        <h3 className="font-grotesk font-bold text-2xl mb-2">Early X-Ray Radiation Dilemma</h3>
        <p className="text-muted-foreground">
          X-ray machines exposed operators to harmful radiation. How would you proceed?
        </p>
      </div>

      {/* Visual Risk Gauge */}
      <div className="mb-8 relative h-48 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Radiation Symbol Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-48 h-48 rounded-full border-8 border-yellow-500" />
              <div className="absolute w-32 h-32 rounded-full bg-yellow-500" />
            </div>
            
            {/* Risk Meter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold mb-2 transition-all duration-500"
                   style={{ color: `hsl(${120 - riskLevel * 1.2}, 70%, 50%)` }}>
                {riskLevel}%
              </div>
              <div className="text-sm text-muted-foreground">Operator Risk Level</div>
              <div className="mt-4 h-2 w-48 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ 
                    width: `${riskLevel}%`,
                    backgroundColor: `hsl(${120 - riskLevel * 1.2}, 70%, 50%)`
                  }}
                />
              </div>
            </div>
          </div>
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
              className="h-auto flex-col py-6 gap-3 relative overflow-hidden"
              onClick={() => handleChoice(choice.id)}
              onMouseEnter={() => !selected && setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              disabled={!!selected}
              data-testid={`button-foundations-${choice.id}`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 ${choice.color} transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
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
        <Card className="p-6 bg-cyan-500/10 border-cyan-500/30 animate-slide-up" data-testid="card-foundations-outcome">
          <h4 className="font-semibold mb-2 text-cyan-400">Historical Outcome</h4>
          <p className="text-sm leading-relaxed">{outcomes[selected as keyof typeof outcomes]}</p>
        </Card>
      )}
    </Card>
  );
}
