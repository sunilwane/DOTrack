import type { PipelineStage } from 'types';
import {
  getActiveStageState,
  getDoneStageTime,
  getPendingStageIcon,
  getPendingStageTime,
} from './constants';

const updateStageAtIndex = (
  stages: PipelineStage[],
  stageIndex: number,
  updater: (stage: PipelineStage) => PipelineStage
): PipelineStage[] =>
  stages.map((stage, index) => (index === stageIndex ? updater(stage) : stage));

export const resetPipelineStages = (stages: PipelineStage[]): PipelineStage[] =>
  stages.map((stage) => ({
    ...stage,
    status: 'pending' as const,
    time: getPendingStageTime(stage.id),
    icon: getPendingStageIcon(stage.id),
  }));

export const markPipelineStageDone = (
  stages: PipelineStage[],
  stageIndex: number
): PipelineStage[] =>
  updateStageAtIndex(stages, stageIndex, (stage) => ({
    ...stage,
    status: 'done' as const,
    time: getDoneStageTime(stageIndex),
    icon: stage.id === 3 ? 'verified_user' : 'check',
  }));

export const markFinalStageComplete = (
  stages: PipelineStage[],
  stageIndex: number
): PipelineStage[] =>
  updateStageAtIndex(stages, stageIndex, (stage) => ({
    ...stage,
    status: 'done' as const,
    time: 'Complete',
    icon: 'check',
  }));

export const markPipelineStageActive = (
  stages: PipelineStage[],
  stageIndex: number
): PipelineStage[] => {
  const activeState = getActiveStageState(stageIndex);
  return updateStageAtIndex(stages, stageIndex, (stage) => ({
    ...stage,
    status: 'active' as const,
    time: activeState.time,
    icon: activeState.icon,
  }));
};
