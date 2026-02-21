import type { AnimatedStage } from './stageAnimationTypes';
import type { StageItem } from './stageTrackerTypes';
import { getIcon, getStateForItem, getStatusClasses } from './stageTrackerUtils';

interface StageTrackerVerticalProps {
  items: StageItem[];
  states: AnimatedStage[];
  className: string;
  showLabels: boolean;
  showTime: boolean;
  connectorDuration: number;
}

const StageTrackerVertical = ({
  items,
  states,
  className,
  showLabels,
  showTime,
  connectorDuration,
}: StageTrackerVerticalProps) => (
  <div className={`flex flex-col relative ${className}`}>
    {items.map((item, index) => {
      const state = getStateForItem(item.id, states);
      const isLast = index === items.length - 1;

      return (
        <div key={item.id} className="grid grid-cols-[48px_1fr] gap-x-4">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center z-10 transition-all duration-500 ${getStatusClasses(
                state.status
              )}`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  state.status === 'active' ? 'animate-spin' : ''
                }`}
              >
                {getIcon(item, state)}
              </span>
            </div>

            {!isLast && (
              <div className="relative w-[2px] h-16 mt-2 bg-slate-200 dark:bg-slate-800">
                <div
                  className="absolute top-0 left-0 w-full bg-primary"
                  style={{
                    height: `${state.connectorProgress}%`,
                    transition:
                      state.connectorProgress === 0
                        ? 'none'
                        : `height ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  }}
                />
              </div>
            )}
          </div>

          <div className={`flex flex-col ${isLast ? '' : 'pb-8'}`}>
            {showLabels && (
              <div
                className={`mb-1 transition-all duration-300 ${
                  state.status === 'active'
                    ? 'text-primary font-bold'
                    : state.status === 'done'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500'
                }`}
              >
                <span className="text-sm">{item.label}</span>
                {state.status === 'active' && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 animate-pulse">
                    Running...
                  </span>
                )}
                {state.status === 'done' && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                    Complete
                  </span>
                )}
              </div>
            )}
            {showTime && item.time && <span className="text-xs text-slate-500">{item.time}</span>}
          </div>
        </div>
      );
    })}
  </div>
);

export default StageTrackerVertical;
