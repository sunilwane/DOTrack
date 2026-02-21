import type { AnimatedStage } from './stageAnimationTypes';
import type { StageItem } from './stageTrackerTypes';
import {
  calculateOverallProgress,
  getIcon,
  getStateForItem,
  getStatusClasses,
} from './stageTrackerUtils';

interface StageTrackerHorizontalProps {
  items: StageItem[];
  states: AnimatedStage[];
  className: string;
  showLabels: boolean;
  showTime: boolean;
  connectorDuration: number;
}

const StageTrackerHorizontal = ({
  items,
  states,
  className,
  showLabels,
  showTime,
  connectorDuration,
}: StageTrackerHorizontalProps) => {
  const overallProgress = calculateOverallProgress(items, states);

  return (
    <div className={`flex items-center justify-between relative w-full px-4 ${className}`}>
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />

      <div
        className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0"
        style={{
          width: `${overallProgress}%`,
          transition:
            overallProgress === 0
              ? 'none'
              : `width ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />

      {items.map((item) => {
        const state = getStateForItem(item.id, states);

        return (
          <div
            key={item.id}
            className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${
              state.status === 'pending' ? 'opacity-40' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center transition-all duration-500 ${getStatusClasses(
                state.status
              )}`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  state.status === 'active' ? 'animate-spin' : ''
                }`}
              >
                {getIcon(item, state)}
              </span>
            </div>

            {showLabels && (
              <div className="text-center">
                <p
                  className={`text-[10px] font-bold uppercase tracking-tight ${
                    state.status === 'active'
                      ? 'text-primary'
                      : state.status === 'pending'
                      ? 'text-slate-500'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {item.label}
                </p>
                {showTime && item.time && (
                  <p
                    className={`text-[9px] font-mono tracking-tighter ${
                      state.status === 'pending' ? 'text-slate-600' : 'text-slate-500'
                    }`}
                  >
                    {item.time}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StageTrackerHorizontal;
