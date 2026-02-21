import type { FC } from 'react';
import type { AnimatedStage } from './stageAnimationTypes';
import StageTrackerHorizontal from './StageTrackerHorizontal';
import type { StageItem } from './stageTrackerTypes';
import StageTrackerVertical from './StageTrackerVertical';

interface StageTrackerProps {
  items: StageItem[];
  states: AnimatedStage[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  showLabels?: boolean;
  showTime?: boolean;
  connectorDuration?: number;
}

const StageTracker: FC<StageTrackerProps> = ({
  items,
  states,
  orientation = 'horizontal',
  className = '',
  showLabels = true,
  showTime = true,
  connectorDuration = 1400,
}) => {
  if (orientation === 'vertical') {
    return (
      <StageTrackerVertical
        items={items}
        states={states}
        className={className}
        showLabels={showLabels}
        showTime={showTime}
        connectorDuration={connectorDuration}
      />
    );
  }

  return (
    <StageTrackerHorizontal
      items={items}
      states={states}
      className={className}
      showLabels={showLabels}
      showTime={showTime}
      connectorDuration={connectorDuration}
    />
  );
};

export default StageTracker;
export type { StageItem };
