import { useState, useEffect, useCallback, useMemo } from 'react';
import { type ProgressData, eras, achievements } from '@shared/schema';

const STORAGE_KEY = 'mdj_progress';

const defaultProgress: ProgressData = {
  completedEras: [],
  currentEra: 'foundations',
  eraChoices: {},
  lastVisited: new Date().toISOString(),
  unlockedAchievements: [],
  missionAttempts: {},
  eraStartTimes: {},
  eraCompletionDurations: {}
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults to handle missing fields from old saves
        setProgress({
          ...defaultProgress,
          ...parsed,
          unlockedAchievements: parsed.unlockedAchievements || [],
          missionAttempts: parsed.missionAttempts || {},
          eraStartTimes: parsed.eraStartTimes || {},
          eraCompletionDurations: parsed.eraCompletionDurations || {}
        });
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, []);

  const saveProgress = useCallback((newProgress: Partial<ProgressData>) => {
    setProgress((currentProgress) => {
      const updated = { 
        ...currentProgress, 
        ...newProgress,
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeEra = useCallback((eraId: string) => {
    setProgress((currentProgress) => {
      if (!currentProgress.completedEras.includes(eraId)) {
        // Calculate completion duration if start time exists
        const startTime = currentProgress.eraStartTimes?.[eraId];
        const duration = startTime ? Date.now() - startTime : undefined;
        
        const updated = {
          ...currentProgress,
          completedEras: [...currentProgress.completedEras, eraId],
          eraCompletionDurations: {
            ...(currentProgress.eraCompletionDurations || {}),
            ...(duration ? { [eraId]: duration } : {})
          },
          lastVisited: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return currentProgress;
    });
  }, []);

  const saveChoice = useCallback((eraId: string, choiceId: string) => {
    setProgress((currentProgress) => {
      const updated = {
        ...currentProgress,
        eraChoices: {
          ...currentProgress.eraChoices,
          [eraId]: choiceId
        },
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const setCurrentEra = useCallback((eraId: string) => {
    setProgress((currentProgress) => {
      const updated = {
        ...currentProgress,
        currentEra: eraId,
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isEraUnlocked = useCallback((eraId: string) => {
    const era = eras.find(e => e.id === eraId);
    if (!era) return false;
    
    if (era.order === 1) return true;
    
    const previousEra = eras.find(e => e.order === era.order - 1);
    if (!previousEra) return true;
    
    return progress.completedEras.includes(previousEra.id);
  }, [progress.completedEras]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(defaultProgress);
  }, []);

  const recordMissionAttempt = useCallback((eraId: string) => {
    setProgress((currentProgress) => {
      const attempts = currentProgress.missionAttempts || {};
      const currentAttempts = attempts[eraId] || 0;
      const updated = {
        ...currentProgress,
        missionAttempts: {
          ...attempts,
          [eraId]: currentAttempts + 1
        },
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const recordEraStart = useCallback((eraId: string) => {
    setProgress((currentProgress) => {
      // Only record if not already started
      if (!currentProgress.eraStartTimes?.[eraId]) {
        const updated = {
          ...currentProgress,
          eraStartTimes: {
            ...(currentProgress.eraStartTimes || {}),
            [eraId]: Date.now()
          },
          lastVisited: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return currentProgress;
    });
  }, []);

  const checkAndUnlockAchievements = useCallback(() => {
    setProgress((currentProgress) => {
      const unlockedIds = currentProgress.unlockedAchievements || [];
      const newAchievements = achievements.filter(
        achievement => 
          !unlockedIds.includes(achievement.id) &&
          achievement.condition(currentProgress)
      ).map(a => a.id);

      if (newAchievements.length > 0) {
        const updated = {
          ...currentProgress,
          unlockedAchievements: [
            ...unlockedIds,
            ...newAchievements
          ],
          lastVisited: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return currentProgress;
    });
  }, []);

  useEffect(() => {
    checkAndUnlockAchievements();
  }, [progress.completedEras.length, progress.eraChoices, checkAndUnlockAchievements]);

  const unlockedAchievementsList = useMemo(() => {
    const unlocked = progress.unlockedAchievements || [];
    return achievements.filter(a => 
      unlocked.includes(a.id)
    );
  }, [progress.unlockedAchievements]);

  const lockedAchievementsList = useMemo(() => {
    const unlocked = progress.unlockedAchievements || [];
    return achievements.filter(a => 
      !unlocked.includes(a.id)
    );
  }, [progress.unlockedAchievements]);

  const completionPercentage = Math.round(
    (progress.completedEras.length / eras.length) * 100
  );

  return {
    progress,
    completeEra,
    saveChoice,
    setCurrentEra,
    isEraUnlocked,
    resetProgress,
    recordMissionAttempt,
    recordEraStart,
    checkAndUnlockAchievements,
    unlockedAchievementsList,
    lockedAchievementsList,
    completionPercentage
  };
}
