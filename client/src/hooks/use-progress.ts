import { useState, useEffect } from 'react';
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

  const saveProgress = (newProgress: Partial<ProgressData>) => {
    const updated = { 
      ...progress, 
      ...newProgress,
      lastVisited: new Date().toISOString()
    };
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const completeEra = (eraId: string) => {
    if (!progress.completedEras.includes(eraId)) {
      saveProgress({
        completedEras: [...progress.completedEras, eraId]
      });
    }
  };

  const saveChoice = (eraId: string, choiceId: string) => {
    saveProgress({
      eraChoices: {
        ...progress.eraChoices,
        [eraId]: choiceId
      }
    });
  };

  const setCurrentEra = (eraId: string) => {
    saveProgress({ currentEra: eraId });
  };

  const isEraUnlocked = (eraId: string) => {
    const era = eras.find(e => e.id === eraId);
    if (!era) return false;
    
    if (era.order === 1) return true;
    
    const previousEra = eras.find(e => e.order === era.order - 1);
    if (!previousEra) return true;
    
    return progress.completedEras.includes(previousEra.id);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(defaultProgress);
  };

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
