import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface SequenceItem {
  id: string;
  label: string;
  order: number;
}

interface SequencingPuzzleProps {
  title: string;
  description: string;
  items: SequenceItem[];
  onComplete: () => void;
  eraId: string;
  onAttempt?: () => void;
}

export function SequencingPuzzle({ title, description, items, onComplete, onAttempt }: SequencingPuzzleProps) {
  const [userOrder, setUserOrder] = useState<SequenceItem[]>([]);
  const [availableItems, setAvailableItems] = useState<SequenceItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
  }, [items]);

  const handleAddToSequence = (item: SequenceItem) => {
    setUserOrder([...userOrder, item]);
    setAvailableItems(availableItems.filter(i => i.id !== item.id));
  };

  const handleRemoveFromSequence = (item: SequenceItem) => {
    setUserOrder(userOrder.filter(i => i.id !== item.id));
    setAvailableItems([...availableItems, item]);
  };

  const handleCheck = () => {
    const correct = userOrder.every((item, index) => item.order === index + 1);
    setIsCorrect(correct);
    setIsComplete(true);
    if (correct) {
      if (onAttempt) onAttempt();
      onComplete();
    }
  };

  const handleReset = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
    setUserOrder([]);
    setIsComplete(false);
    setIsCorrect(false);
  };

  return (
    <Card className="p-6 border-2 border-teal-500/30 shadow-xl shadow-teal-500/10" data-testid="card-sequencing-puzzle">
      <h3 className="font-grotesk font-bold text-xl mb-2" data-testid="text-puzzle-title">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Available Steps
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableItems.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                onClick={() => handleAddToSequence(item)}
                className="hover-elevate active-elevate-2"
                data-testid={`button-available-${item.id}`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Your Sequence
          </h4>
          <div className="min-h-[100px] p-4 border-2 border-dashed border-border rounded-md bg-card/50">
            {userOrder.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm">
                Click items above to build your sequence
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {userOrder.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-card rounded-md border group"
                    data-testid={`sequence-item-${item.id}`}
                  >
                    <span className="font-mono text-xs text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <span className="flex-1">{item.label}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromSequence(item)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-remove-${item.id}`}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCheck}
            disabled={userOrder.length !== items.length || isCorrect}
            className="flex-1"
            data-testid="button-check-sequence"
          >
            Check Sequence
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            data-testid="button-reset-sequence"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {isComplete && (
          <Card 
            className={`p-4 animate-slide-up ${
              isCorrect 
                ? 'bg-primary/5 border-primary/20' 
                : 'bg-destructive/5 border-destructive/20'
            }`}
            data-testid="card-puzzle-result"
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <div>
                <h4 className="font-semibold text-sm">
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isCorrect 
                    ? 'You\'ve mastered the device development pipeline!' 
                    : 'Try again - the order matters!'}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}
