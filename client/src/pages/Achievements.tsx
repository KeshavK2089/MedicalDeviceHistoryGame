import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/hooks/use-progress";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ArrowLeft, Trophy } from "lucide-react";

export default function Achievements() {
  const [, setLocation] = useLocation();
  const { unlockedAchievementsList, lockedAchievementsList } = useProgress();

  const totalAchievements = unlockedAchievementsList.length + lockedAchievementsList.length;
  const achievementPercentage = Math.round((unlockedAchievementsList.length / totalAchievements) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <ProgressTracker />
      
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-grotesk font-bold text-3xl tracking-tight flex items-center gap-3" data-testid="text-achievements-title">
                <Trophy className="w-8 h-8 text-yellow-500" />
                Achievements
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {unlockedAchievementsList.length} of {totalAchievements} unlocked ({achievementPercentage}%)
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setLocation("/timeline")}
              data-testid="button-back-timeline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timeline
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Unlocked Achievements */}
        {unlockedAchievementsList.length > 0 && (
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-2xl mb-6 text-cyan-400">
              Unlocked
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unlockedAchievementsList.map((achievement) => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement} 
                  unlocked={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievementsList.length > 0 && (
          <div>
            <h2 className="font-grotesk font-bold text-2xl mb-6 text-muted-foreground">
              Locked
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lockedAchievementsList.map((achievement) => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement} 
                  unlocked={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {unlockedAchievementsList.length === 0 && lockedAchievementsList.length === 0 && (
          <Card className="p-12 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-grotesk font-bold text-2xl mb-2">No Achievements Yet</h2>
            <p className="text-muted-foreground mb-6">
              Complete eras and make ethical choices to unlock achievements
            </p>
            <Button onClick={() => setLocation("/timeline")}>
              Start Your Journey
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
