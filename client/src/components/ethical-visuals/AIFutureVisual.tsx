import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Eye, Scale, Network } from "lucide-react";

interface AIFutureVisualProps {
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

const choices = [
  {
    id: "accuracy",
    label: "Maximize Accuracy",
    icon: Brain,
    accuracy: 95,
    transparency: 20,
    description: "Black box AI, best results"
  },
  {
    id: "transparency",
    label: "Maximize Transparency",
    icon: Eye,
    accuracy: 75,
    transparency: 95,
    description: "Explainable AI, lower accuracy"
  },
  {
    id: "balanced",
    label: "Balanced Approach",
    icon: Scale,
    accuracy: 85,
    transparency: 70,
    description: "Hybrid model with explanations"
  }
];

const outcomes = {
  accuracy: "AI caught rare conditions but doctors couldn't explain decisions. Patient trust varied.",
  transparency: "Doctors understood every recommendation but missed some edge cases. Higher trust.",
  balanced: "Hybrid approach worked well. Explainable AI with acceptable accuracy built physician confidence."
};

export function AIFutureVisual({ onChoice, selectedChoice }: AIFutureVisualProps) {
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

  const activeChoice = choices.find(c => c.id === (selected || hoveredChoice)) || choices[2];

  // Neural network visualization
  const layers = [3, 5, 4, 2];
  const totalWidth = 400;
  const totalHeight = 200;
  const layerSpacing = totalWidth / (layers.length + 1);

  return (
    <Card className="p-8 border-2 border-purple-500/30 bg-gradient-to-br from-background via-purple-950/10 to-background" data-testid="card-ai-ethical">
      <div className="text-center mb-6">
        <h3 className="font-grotesk font-bold text-2xl mb-2">AI Transparency vs Accuracy</h3>
        <p className="text-muted-foreground">
          Black box AI achieves higher accuracy but can't explain its decisions
        </p>
      </div>

      {/* Neural Network Visualization */}
      <div className="mb-8 relative h-64 flex items-center justify-center bg-secondary/10 rounded-lg">
        <svg width={totalWidth} height={totalHeight} className="overflow-visible">
          {/* Draw connections */}
          {layers.map((nodeCount, layerIdx) => {
            if (layerIdx === layers.length - 1) return null;
            const nextLayerNodes = layers[layerIdx + 1];
            const x1 = (layerIdx + 1) * layerSpacing;
            const x2 = (layerIdx + 2) * layerSpacing;

            return Array.from({ length: nodeCount }).map((_, nodeIdx) => {
              const y1 = (totalHeight / (nodeCount + 1)) * (nodeIdx + 1);
              return Array.from({ length: nextLayerNodes }).map((_, nextNodeIdx) => {
                const y2 = (totalHeight / (nextLayerNodes + 1)) * (nextNodeIdx + 1);
                return (
                  <line
                    key={`${layerIdx}-${nodeIdx}-${nextNodeIdx}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#a855f7"
                    strokeWidth="1"
                    opacity={activeChoice.transparency / 100}
                  />
                );
              });
            });
          })}

          {/* Draw nodes */}
          {layers.map((nodeCount, layerIdx) => {
            const x = (layerIdx + 1) * layerSpacing;
            return Array.from({ length: nodeCount }).map((_, nodeIdx) => {
              const y = (totalHeight / (nodeCount + 1)) * (nodeIdx + 1);
              return (
                <circle
                  key={`${layerIdx}-${nodeIdx}`}
                  cx={x}
                  cy={y}
                  r="8"
                  fill="#a855f7"
                  opacity={layerIdx === 0 || layerIdx === layers.length - 1 ? 1 : 0.3 + (activeChoice.transparency / 100) * 0.7}
                  className="transition-opacity duration-500"
                />
              );
            });
          })}

          {/* Labels */}
          <text x="20" y="20" fontSize="12" fill="currentColor" opacity="0.5">
            Input
          </text>
          <text x={totalWidth - 50} y="20" fontSize="12" fill="currentColor" opacity="0.5">
            Output
          </text>
          <text x={totalWidth / 2 - 30} y={totalHeight - 10} fontSize="10" fill="#a855f7" opacity={activeChoice.transparency / 100}>
            {activeChoice.transparency < 50 ? "Hidden Layers" : "Explained Logic"}
          </text>
        </svg>

        {/* Transparency Overlay */}
        <div 
          className="absolute inset-0 bg-black rounded-lg pointer-events-none transition-opacity duration-500"
          style={{ opacity: (100 - activeChoice.transparency) / 100 * 0.7 }}
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Diagnostic Accuracy</span>
            <span className="text-purple-400 font-bold">{activeChoice.accuracy}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-400 transition-all duration-500 rounded-full"
              style={{ width: `${activeChoice.accuracy}%` }}
            />
          </div>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Explainability</span>
            <span className="text-cyan-400 font-bold">{activeChoice.transparency}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${activeChoice.transparency}%` }}
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
              data-testid={`button-ai-${choice.id}`}
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
        <Card className="p-6 bg-purple-500/10 border-purple-500/30 animate-slide-up" data-testid="card-ai-outcome">
          <h4 className="font-semibold mb-2 text-purple-400">Future Scenario</h4>
          <p className="text-sm leading-relaxed">{outcomes[selected as keyof typeof outcomes]}</p>
        </Card>
      )}
    </Card>
  );
}
