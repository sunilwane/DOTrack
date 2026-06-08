import type { AnimatedStage } from './stageAnimationTypes';
import type { StageItem } from './stageTrackerTypes';

export const getStateForItem = (
  itemId: string | number,
  states: AnimatedStage[]
): AnimatedStage =>
  states.find((state) => state.id === itemId) || {
    id: itemId,
    status: 'pending',
    connectorProgress: 0,
  };

export const calculateOverallProgress = (
  items: StageItem[],
  states: AnimatedStage[]
): number => {
  const totalSteps = items.length - 1;
  if (totalSteps <= 0) return 0;

  const doneCount = states.filter(
    (state) => state.status === 'done' && state.connectorProgress === 100
  ).length;

  const animatingStage = states.find(
    (state) => state.status === 'done' && state.connectorProgress < 100
  );
  const animatingProgress = animatingStage ? animatingStage.connectorProgress / 100 : 0;
  const progressPerStage = 100 / totalSteps;

  return doneCount * progressPerStage + animatingProgress * progressPerStage;
};

export const getIcon = (item: StageItem, state: AnimatedStage): string => {
  if (state.status === 'done') return item.doneIcon || 'check';
  if (state.status === 'active') return item.activeIcon || 'progress_activity';
  return item.icon || 'radio_button_unchecked';
};

export const getStatusClasses = (status: AnimatedStage['status']) => {
  switch (status) {
    case 'done':
      return 'size-10 rounded-full bg-emerald-500 text-white shadow-lg';
    case 'active':
      return 'size-12 rounded-full bg-primary text-white ring-4 ring-primary/20 shadow-lg scale-110';
    case 'pending':
    default:
      return 'size-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 opacity-40';
  }
};
