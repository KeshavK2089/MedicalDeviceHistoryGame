import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface Choice {
  id: string;
  label: string;
  outcome: string;
}

interface ChoiceScenarioProps {
  title: string;
  description: string;
  choices: Choice[];
  onChoice: (choiceId: string) => void;
  selectedChoice?: string;
}

export function ChoiceScenario({ title, description, choices, onChoice, selectedChoice }: ChoiceScenarioProps) {
  const [selected, setSelected] = useState<string | null>(selectedChoice || null);
  const [showOutcome, setShowOutcome] = useState(!!selectedChoice);

  const handleChoice = (choiceId: string) => {
    if (selected) return; // Prevent multiple selections
    setSelected(choiceId);
    setShowOutcome(true);
    onChoice(choiceId);
  };

  const selectedChoiceData = choices.find(c => c.id === selected);

  return (
    <Card className="p-6 border-2 border-primary/30 shadow-xl shadow-primary/10" data-testid="card-choice-scenario">
      <h3 className="font-grotesk font-bold text-xl mb-2" data-testid="text-choice-title">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="space-y-3">
        {choices.map((choice) => (
          <Button
            key={choice.id}
            variant={selected === choice.id ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-4 px-4"
            onClick={() => handleChoice(choice.id)}
            disabled={showOutcome}
            data-testid={`button-choice-${choice.id}`}
          >
            <div className="flex items-start gap-3 w-full">
              {selected === choice.id && (
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <span className="flex-1">{choice.label}</span>
            </div>
          </Button>
        ))}
      </div>

      {showOutcome && selectedChoiceData && (
        <Card className="mt-6 p-4 bg-primary/5 border-primary/20 animate-slide-up" data-testid="card-choice-outcome">
          <h4 className="font-semibold text-sm mb-2 text-primary-foreground">Outcome</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {selectedChoiceData.outcome}
          </p>
        </Card>
      )}
    </Card>
  );
}
