import type { StageItem } from '../../Components/common/StageAnimation';
import type { PipelineStage } from 'types';

export const buildPipelineStageItems = (initialStages: PipelineStage[]): StageItem[] =>
  initialStages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    time: stage.time,
    icon: stage.icon,
    activeIcon:
      stage.id === 4
        ? 'pen_size_2'
        : stage.id === 5
        ? 'rocket_launch'
        : 'progress_activity',
    doneIcon: stage.id === 3 ? 'verified_user' : 'check',
  }));
