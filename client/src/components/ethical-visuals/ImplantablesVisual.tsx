import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Minimize2, Zap } from "lucide-react";

interface ImplantablesVisualProps {
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

const choices = [
  {
    id: "longer-battery",
    label: "Longer Battery Life",
    icon: Battery,
    batteryLife: 10,
    deviceSize: 80,
    surgeries: 1,
    description: "Fewer surgeries, bulkier device"
  },
  {
    id: "smaller-device",
    label: "Smaller Device",
    icon: Minimize2,
    batteryLife: 5,
    deviceSize: 40,
    surgeries: 3,
    description: "Compact & comfortable, more surgeries"
  },
  {
    id: "wireless-charging",
    label: "Wireless Charging",
    icon: Zap,
    batteryLife: 999,
    deviceSize: 55,
    surgeries: 0,
    description: "Innovation with early risks"
  }
];

const outcomes = {
  "longer-battery": "Fewer surgeries achieved, but larger devices caused discomfort and implantation challenges.",
  "smaller-device": "Patients loved the comfort, but faced more frequent replacement surgeries over their lifetime.",
  "wireless-charging": "Innovation paid off long-term. Early failure rates decreased as technology matured."
};

export function ImplantablesVisual({ onChoice, selectedChoice }: ImplantablesVisualProps) {
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
  const specs = activeChoice || choices[0];

  return (
    <Card className="p-8 border-2 border-purple-500/30 bg-gradient-to-br from-background via-purple-950/10 to-background" data-testid="card-implantables-ethical">
      <div className="text-center mb-6">
        <h3 className="font-grotesk font-bold text-2xl mb-2">Pacemaker Design Trade-off</h3>
        <p className="text-muted-foreground">
          Balance battery life, device size, and patient surgeries
        </p>
      </div>

      {/* Visual Body Diagram with Device */}
      <div className="mb-8 relative h-64 flex items-center justify-center">
        <div className="relative">
          {/* Body Outline */}
          <svg width="200" height="240" viewBox="0 0 200 240" className="opacity-30">
            <ellipse cx="100" cy="60" rx="40" ry="50" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="70" y="100" width="60" height="100" rx="30" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="120" x2="40" y2="180" stroke="currentColor" strokeWidth="2" />
            <line x1="130" y1="120" x2="160" y2="180" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Pacemaker Device - Size varies */}
          <div 
            className="absolute top-24 left-1/2 -translate-x-1/2 bg-purple-500 rounded-lg border-2 border-purple-300 flex items-center justify-center transition-all duration-500"
            style={{
              width: `${specs.deviceSize}px`,
              height: `${specs.deviceSize * 0.6}px`
            }}
          >
            <Battery className="w-6 h-6 text-white" />
          </div>

          {/* Connection Wires */}
          <svg width="200" height="240" viewBox="0 0 200 240" className="absolute inset-0 pointer-events-none">
            <path d="M 100 90 Q 90 100, 100 110" stroke="#a855f7" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Specs Display */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">
            {specs.batteryLife === 999 ? "∞" : `${specs.batteryLife}y`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Battery Life</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">{specs.deviceSize}mm</div>
          <div className="text-xs text-muted-foreground mt-1">Device Size</div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">
            {specs.surgeries === 0 ? "0" : `${specs.surgeries}/life`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Replacements</div>
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
              data-testid={`button-implantables-${choice.id}`}
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
        <Card className="p-6 bg-purple-500/10 border-purple-500/30 animate-slide-up" data-testid="card-implantables-outcome">
          <h4 className="font-semibold mb-2 text-purple-400">Historical Outcome</h4>
          <p className="text-sm leading-relaxed">{outcomes[selected as keyof typeof outcomes]}</p>
        </Card>
      )}
    </Card>
  );
}
