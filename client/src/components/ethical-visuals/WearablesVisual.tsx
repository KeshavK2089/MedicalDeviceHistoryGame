import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Lock, Filter, Database, Shield, TrendingDown } from "lucide-react";

interface WearablesVisualProps {
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

const choices = [
  {
    id: "share",
    label: "Share Full Data",
    icon: Share2,
    privacy: 20,
    savings: 30,
    description: "Lower premiums, full access"
  },
  {
    id: "refuse",
    label: "Protect Privacy",
    icon: Lock,
    privacy: 100,
    savings: 0,
    description: "No data sharing"
  },
  {
    id: "aggregate",
    label: "Anonymized Data",
    icon: Filter,
    privacy: 70,
    savings: 15,
    description: "Middle ground approach"
  }
];

const outcomes = {
  share: "Saved money and got positive reinforcement. But what happens when data shows imperfect management?",
  refuse: "Maintained control over health data but paid higher premiums. Set boundary against surveillance.",
  aggregate: "Found middle ground. Insurers got insights without individual surveillance, smaller discount."
};

export function WearablesVisual({ onChoice, selectedChoice }: WearablesVisualProps) {
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
    <Card className="p-8 border-2 border-cyan-500/30 bg-gradient-to-br from-background via-cyan-950/10 to-background" data-testid="card-wearables-ethical">
      <div className="text-center mb-6">
        <h3 className="font-grotesk font-bold text-2xl mb-2">CGM Data Privacy Dilemma</h3>
        <p className="text-muted-foreground">
          Insurer requests access to your glucose data for premium discounts
        </p>
      </div>

      {/* Data Flow Visualization */}
      <div className="mb-8 relative h-64 flex items-center justify-center">
        <div className="relative w-full max-w-2xl">
          {/* You (Patient) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-center">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center mb-2">
              <Database className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="text-sm font-semibold">Your CGM</div>
            <div className="text-xs text-muted-foreground">Health Data</div>
          </div>

          {/* Data Flow Lines */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
              </marker>
            </defs>
            {/* Line to Insurer */}
            <line 
              x1="120" y1="50%" x2="calc(100% - 120)" y2="50%" 
              stroke="#06b6d4" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead)"
              className="transition-opacity duration-500"
              style={{ opacity: activeChoice.privacy < 100 ? 0.8 : 0.1 }}
              strokeDasharray={activeChoice.id === "aggregate" ? "5,5" : "0"}
            />
          </svg>

          {/* Privacy Shield (grows with privacy level) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              className="transition-all duration-500"
              style={{ 
                transform: `scale(${activeChoice.privacy / 100})`,
                opacity: activeChoice.privacy / 100
              }}
            >
              <Shield className="w-16 h-16 text-cyan-400" />
            </div>
          </div>

          {/* Insurer */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary border-2 border-border flex items-center justify-center mb-2">
              <TrendingDown className="w-10 h-10" />
            </div>
            <div className="text-sm font-semibold">Insurer</div>
            <div className="text-xs text-cyan-400">-${activeChoice.savings}/mo</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Privacy Protection</span>
            <span className="text-cyan-400 font-bold">{activeChoice.privacy}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${activeChoice.privacy}%` }}
            />
          </div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Premium Savings</span>
            <span className="text-green-400 font-bold">${activeChoice.savings}/mo</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-500 rounded-full"
              style={{ width: `${(activeChoice.savings / 30) * 100}%` }}
            />
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
              className="h-auto flex-col py-6 gap-3"
              onClick={() => handleChoice(choice.id)}
              onMouseEnter={() => !selected && setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              disabled={!!selected}
              data-testid={`button-wearables-${choice.id}`}
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
        <Card className="p-6 bg-cyan-500/10 border-cyan-500/30 animate-slide-up" data-testid="card-wearables-outcome">
          <h4 className="font-semibold mb-2 text-cyan-400">Historical Outcome</h4>
          <p className="text-sm leading-relaxed">{outcomes[selected as keyof typeof outcomes]}</p>
        </Card>
      )}
    </Card>
  );
}
