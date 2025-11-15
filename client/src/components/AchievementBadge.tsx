import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, Trophy, TrendingUp, Target, Zap, 
  Shield, Lightbulb, Scale, Compass, Lock 
} from "lucide-react";
import { type Achievement } from "@shared/schema";

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

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  showAnimation?: boolean;
}

export function AchievementBadge({ achievement, unlocked, showAnimation = false }: AchievementBadgeProps) {
  const IconComponent = iconMap[achievement.icon] || Award;
  
  const categoryColors = {
    completion: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    speed: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    ethics: "bg-teal-500/10 border-teal-500/30 text-teal-400",
    special: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
  };

  const glowColors = {
    completion: "shadow-cyan-500/20",
    speed: "shadow-purple-500/20",
    ethics: "shadow-teal-500/20",
    special: "shadow-yellow-500/20"
  };

  return (
    <Card 
      className={`
        p-6 transition-all duration-300 relative overflow-hidden
        ${unlocked 
          ? `${categoryColors[achievement.category]} ${glowColors[achievement.category]} shadow-lg ${showAnimation ? 'animate-[slideUp_0.5s_ease-out]' : ''}` 
          : 'opacity-50 grayscale'
        }
      `}
      data-testid={`achievement-${achievement.id}`}
    >
      {!unlocked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`
          p-3 rounded-lg 
          ${unlocked ? categoryColors[achievement.category] : 'bg-muted'}
          transition-transform duration-300
          ${showAnimation ? 'animate-[pulse_1s_ease-in-out]' : ''}
        `}>
          <IconComponent className="w-8 h-8" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-grotesk font-bold text-lg mb-1" data-testid={`text-achievement-name-${achievement.id}`}>
            {achievement.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {achievement.description}
          </p>
          <Badge variant="outline" className="text-xs">
            {achievement.category}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
