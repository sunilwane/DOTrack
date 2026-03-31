export const ANIMATION_INTERVAL_MS = 2500;
export const ANIMATION_RESTART_DELAY_MS = 3000;

const doneStageTimes = ['2m ago', '1m ago', '45s ago', '30s ago'] as const;

export const getPendingStageTime = (stageId: number) =>
  stageId === 5 ? 'Queued' : 'Pending';

export const getPendingStageIcon = (stageId: number) => {
  if (stageId === 3) return 'verified_user';
  if (stageId === 4) return 'pen_size_2';
  if (stageId === 5) return 'rocket_launch';
  return 'check';
};

export const getDoneStageTime = (stageIndex: number) =>
  doneStageTimes[stageIndex] || 'Just now';

export const getActiveStageState = (stageIndex: number) => {
  if (stageIndex === 3) {
    return { time: 'Pending Signature', icon: 'pen_size_2' };
  }

  if (stageIndex === 4) {
    return { time: 'Deploying...', icon: 'rocket_launch' };
  }

  return { time: 'Running...', icon: 'progress_activity' };
};
