export type StageStatus = 'pending' | 'active' | 'done';

export interface AnimatedStage {
  id: string | number;
  status: StageStatus;
  connectorProgress: number;
}

export interface UseStageAnimationOptions {
  loadingDuration?: number;
  connectorDuration?: number;
  restartDelay?: number;
  loop?: boolean;
}
