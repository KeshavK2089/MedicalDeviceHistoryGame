import { useProgress } from "@/hooks/use-progress";

export function ProgressTracker() {
  const { completionPercentage } = useProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-card" data-testid="progress-tracker">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-teal-500 transition-all duration-500 ease-out"
        style={{ width: `${completionPercentage}%` }}
        data-testid="progress-bar-fill"
      />
    </div>
  );
}
