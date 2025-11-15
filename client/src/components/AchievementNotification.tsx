import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { type Achievement } from "@shared/schema";
import { 
  Award, Trophy, TrendingUp, Target, Zap, 
  Shield, Lightbulb, Scale, Compass 
} from "lucide-react";

const iconMap: Record<string, any> = {
  Award,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Lightbulb,
  Scale,
  Compass
};

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementNotification({ achievement, onDismiss }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const IconComponent = iconMap[achievement.icon] || Award;

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const categoryColors = {
    completion: "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
    speed: "bg-purple-500/20 border-purple-500/50 text-purple-400",
    ethics: "bg-teal-500/20 border-teal-500/50 text-teal-400",
    special: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
  };

  return (
    <Card 
      className={`
        ${categoryColors[achievement.category]}
        p-4 shadow-2xl backdrop-blur-sm
        transition-all duration-300 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
      data-testid={`notification-achievement-${achievement.id}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${categoryColors[achievement.category]} animate-[pulse_1s_ease-in-out_3]`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-0.5">
            Achievement Unlocked!
          </div>
          <div className="font-grotesk font-bold text-sm">
            {achievement.name}
          </div>
        </div>
      </div>
    </Card>
  );
}
