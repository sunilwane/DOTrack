import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createInitialAnimatedStates,
  defaultOptions,
  setStageConnectorProgress,
  setStageStatus,
} from './animationState';
import type {
  AnimatedStage,
  UseStageAnimationOptions,
} from './stageAnimationTypes';

export type { AnimatedStage, StageStatus, UseStageAnimationOptions } from './stageAnimationTypes';

export function useStageAnimation<T extends { id: string | number }>(
  items: T[],
  options: UseStageAnimationOptions = {}
): { states: AnimatedStage[]; currentIndex: number } {
  const opts = { ...defaultOptions, ...options };
  const [animatedStates, setAnimatedStates] = useState<AnimatedStage[]>(() =>
    createInitialAnimatedStates(items)
  );

  const currentIndexRef = useRef(0);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(
    (delay: number, onComplete: () => void) => {
      clearTimers();
      animationTimerRef.current = setTimeout(() => {
        if (!isMountedRef.current) {
          return;
        }
        onComplete();
      }, delay);
    },
    [clearTimers]
  );

  const animateConnector = useCallback(
    (stageIndex: number, onComplete: () => void) => {
      if (!isMountedRef.current) return;

      const duration = opts.connectorDuration ?? defaultOptions.connectorDuration ?? 1400;
      setAnimatedStates((previous) => setStageConnectorProgress(previous, stageIndex, 100));
      scheduleNext(duration, onComplete);
    },
    [opts.connectorDuration, scheduleNext]
  );

  const runLoadingAndAdvance = useCallback(() => {
    if (!isMountedRef.current) return;

    const currentIndex = currentIndexRef.current;
    const totalItems = items.length;
    const loadingDuration = opts.loadingDuration ?? defaultOptions.loadingDuration ?? 1500;
    const restartDelay = opts.restartDelay ?? defaultOptions.restartDelay ?? 2000;

    scheduleNext(loadingDuration, () => {
      setAnimatedStates((previous) => setStageStatus(previous, currentIndex, 'done'));

      if (currentIndex < totalItems - 1) {
        animateConnector(currentIndex, () => {
          const nextIndex = currentIndex + 1;
          currentIndexRef.current = nextIndex;
          setAnimatedStates((previous) => setStageStatus(previous, nextIndex, 'active'));
          runLoadingAndAdvance();
        });
        return;
      }

      if (opts.loop) {
        scheduleNext(restartDelay, () => {
          currentIndexRef.current = 0;
          setAnimatedStates(createInitialAnimatedStates(items));
          runLoadingAndAdvance();
        });
      }
    });
  }, [
    animateConnector,
    items,
    opts.loadingDuration,
    opts.loop,
    opts.restartDelay,
    scheduleNext,
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    currentIndexRef.current = 0;
    setAnimatedStates(createInitialAnimatedStates(items));
    runLoadingAndAdvance();

    return () => {
      isMountedRef.current = false;
      clearTimers();
    };
  }, [items, runLoadingAndAdvance, clearTimers]);

  return {
    states: animatedStates,
    currentIndex: currentIndexRef.current,
  };
}
