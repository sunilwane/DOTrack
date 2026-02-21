import { useEffect, useRef, useState } from 'react';
import type { PipelineStage } from 'types';
import {
  ANIMATION_INTERVAL_MS,
  ANIMATION_RESTART_DELAY_MS,
} from './pipelineAnimation/constants';
import {
  markFinalStageComplete,
  markPipelineStageActive,
  markPipelineStageDone,
  resetPipelineStages,
} from './pipelineAnimation/stageTransforms';

export function usePipelineAnimation(initialStages: PipelineStage[]) {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const intervalRef = useRef<number | null>(null);
  const restartTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let currentStageIndex = 0;

    const clearTimers = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };

    const runAnimation = () => {
      clearTimers();
      setStages(resetPipelineStages(initialStages));
      currentStageIndex = 0;

      intervalRef.current = window.setInterval(() => {
        setStages((previous) => {
          if (currentStageIndex >= previous.length) {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            restartTimeoutRef.current = window.setTimeout(
              runAnimation,
              ANIMATION_RESTART_DELAY_MS
            ) as unknown as number;

            return currentStageIndex === previous.length && previous[currentStageIndex - 1]
              ? markFinalStageComplete(previous, currentStageIndex - 1)
              : previous;
          }

          let nextStages = previous;

          if (currentStageIndex > 0) {
            nextStages = markPipelineStageDone(nextStages, currentStageIndex - 1);
          }

          nextStages = markPipelineStageActive(nextStages, currentStageIndex);
          currentStageIndex += 1;
          return nextStages;
        });
      }, ANIMATION_INTERVAL_MS) as unknown as number;
    };

    runAnimation();

    return clearTimers;
  }, [initialStages]);

  return stages;
}
