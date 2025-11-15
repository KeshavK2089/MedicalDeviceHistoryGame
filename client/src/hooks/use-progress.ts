import { useState, useEffect, useCallback } from 'react';
import { type ProgressData, eras } from '@shared/schema';

const STORAGE_KEY = 'mdj_progress';

const defaultProgress: ProgressData = {
  completedEras: [],
  currentEra: 'foundations',
  eraChoices: {},
  lastVisited: new Date().toISOString()
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
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
        const updated = {
          ...currentProgress,
          completedEras: [...currentProgress.completedEras, eraId],
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
    completionPercentage
  };
}
