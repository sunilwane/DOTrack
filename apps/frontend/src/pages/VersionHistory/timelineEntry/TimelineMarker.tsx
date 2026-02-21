import { getMarkerClasses, getVersionIcon, type VersionState } from './status';

interface TimelineMarkerProps {
  icon: string;
  versionState: VersionState;
  showConnector: boolean;
  connectorProgress: number;
  connectorDuration: number;
}

const TimelineMarker = ({
  icon,
  versionState,
  showConnector,
  connectorProgress,
  connectorDuration,
}: TimelineMarkerProps) => (
  <div className="flex flex-col items-center">
    <div
      className={`flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${getMarkerClasses(
        versionState
      )}`}
    >
      <span
        className={`material-symbols-outlined text-xl ${
          versionState === 'active' ? 'animate-spin' : ''
        }`}
      >
        {getVersionIcon(versionState, icon)}
      </span>
    </div>

    {showConnector && (
      <div className="relative w-[2px] h-full mt-2 bg-slate-200 dark:bg-slate-800">
        <div
          className="absolute top-0 left-0 w-full bg-primary"
          style={{
            height: `${connectorProgress}%`,
            transition:
              connectorProgress === 0
                ? 'none'
                : `height ${connectorDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>
    )}
  </div>
);

export default TimelineMarker;
