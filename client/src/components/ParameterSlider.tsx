import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Eye } from "lucide-react";

interface ParameterSliderProps {
  title: string;
  description: string;
  min: number;
  max: number;
  optimal: [number, number];
  initial: number;
  unit: string;
  onComplete: () => void;
  eraId: string;
  onAttempt?: () => void;
}

export function ParameterSlider({ 
  title, 
  description, 
  min, 
  max, 
  optimal, 
  initial, 
  unit,
  onComplete,
  onAttempt 
}: ParameterSliderProps) {
  const [value, setValue] = useState([initial]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [attemptedOnce, setAttemptedOnce] = useState(false);
  const currentValue = value[0];
  
  // Ensure optimal is properly typed as numbers
  const optimalMin = Number(optimal[0]);
  const optimalMax = Number(optimal[1]);
  const isInRange = currentValue >= optimalMin && currentValue <= optimalMax;

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    const newVal = newValue[0];
    
    const inRange = newVal >= optimalMin && newVal <= optimalMax;
    
    // Mark as attempted once user moves the slider
    if (!attemptedOnce) {
      setAttemptedOnce(true);
    }
    
    // Reset completion flag if slider exits optimal range
    if (!inRange && hasCompleted) {
      setHasCompleted(false);
    }
    
    // Trigger completion when entering optimal range for first time (or after exiting)
    if (!hasCompleted && inRange) {
      if (onAttempt) onAttempt();
      setHasCompleted(true);
      setTimeout(() => onComplete(), 500);
    }
  };

  const handleShowAnswer = () => {
    const midpoint = Math.floor((optimalMin + optimalMax) / 2);
    setValue([midpoint]);
    if (!hasCompleted) {
      if (onAttempt) onAttempt();
      setHasCompleted(true);
      setTimeout(() => onComplete(), 500);
    }
  };

  const getStatus = () => {
    if (currentValue < optimalMin) return { label: "Too Low", color: "destructive" };
    if (currentValue > optimalMax) return { label: "Too High", color: "destructive" };
    return { label: "Optimal Range", color: "primary" };
  };

  const status = getStatus();

  return (
    <Card className="p-6 border-2 border-purple-500/30 shadow-xl shadow-purple-500/10" data-testid="card-parameter-slider">
      <h3 className="font-grotesk font-bold text-xl mb-2" data-testid="text-slider-title">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Current Value</span>
            <div className="flex items-center gap-3">
              <span className="font-grotesk font-bold text-2xl" data-testid="text-slider-value">
                {currentValue} <span className="text-sm text-muted-foreground">{unit}</span>
              </span>
              {isInRange ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-destructive" />
              )}
            </div>
          </div>

          <div className="relative">
            <Slider
              value={value}
              onValueChange={handleValueChange}
              min={min}
              max={max}
              step={1}
              className="w-full"
              data-testid="slider-parameter"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{min} {unit}</span>
              <span>{max} {unit}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/30 rounded-md border border-dashed">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target Range:</span>
              <span className="font-mono font-medium">
                {optimalMin} - {optimalMax} {unit}
              </span>
            </div>
          </div>
        </div>

        <Card 
          className={`p-4 ${
            status.color === "primary" 
              ? 'bg-primary/5 border-primary/20' 
              : 'bg-destructive/5 border-destructive/20'
          }`}
          data-testid="card-slider-status"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Badge 
                variant={status.color === "primary" ? "default" : "destructive"}
                className="uppercase tracking-wide"
              >
                {status.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {isInRange 
                  ? 'Perfect! You\'ve found the safe zone.' 
                  : 'Adjust the value to reach the optimal range'}
              </p>
            </div>
            {!isInRange && attemptedOnce && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowAnswer}
                className="flex items-center gap-2"
                data-testid="button-show-answer"
              >
                <Eye className="w-4 h-4" />
                Hint
              </Button>
            )}
          </div>
        </Card>

        {isInRange && (
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden animate-glow-pulse">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-teal-500 animate-portal-spin" />
          </div>
        )}
      </div>
    </Card>
  );
}
