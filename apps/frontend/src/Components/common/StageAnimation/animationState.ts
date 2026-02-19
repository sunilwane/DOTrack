import type { AnimatedStage, UseStageAnimationOptions } from './stageAnimationTypes';

export const defaultOptions: UseStageAnimationOptions = {
  loadingDuration: 1500,
  connectorDuration: 1400,
  restartDelay: 2000,
  loop: true,
};

export const createInitialAnimatedStates = <T extends { id: string | number }>(
  items: T[]
): AnimatedStage[] =>
  items.map((item, index) => ({
    id: item.id,
    status: index === 0 ? 'active' : 'pending',
    connectorProgress: 0,
  }));

const updateStage = (
  states: AnimatedStage[],
  stageIndex: number,
  updater: (stage: AnimatedStage) => AnimatedStage
): AnimatedStage[] =>
  states.map((stage, index) => (index === stageIndex ? updater(stage) : stage));

export const setStageStatus = (
  states: AnimatedStage[],
  stageIndex: number,
  status: AnimatedStage['status']
): AnimatedStage[] =>
  updateStage(states, stageIndex, (stage) => ({
    ...stage,
    status,
  }));

export const setStageConnectorProgress = (
  states: AnimatedStage[],
  stageIndex: number,
  connectorProgress: number
): AnimatedStage[] =>
  updateStage(states, stageIndex, (stage) => ({
    ...stage,
    connectorProgress,
  }));
