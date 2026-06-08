import * as React from 'react';
import type { VersionEntry } from '../../mock/PagesMockData/versionHistory';
import TimelineExpandedDetails from './timelineEntry/TimelineExpandedDetails';
import TimelineHeader from './timelineEntry/TimelineHeader';
import TimelineMarker from './timelineEntry/TimelineMarker';
import TimelineSummaryDetails from './timelineEntry/TimelineSummaryDetails';
import { getCardClasses, type VersionState } from './timelineEntry/status';

interface TimelineEntryProps {
  entry: VersionEntry;
  isLast: boolean;
  isSelected: boolean;
  onToggleSelection: () => void;
  versionState: string;
  showConnector: boolean;
  connectorProgress: number;
  connectorDuration?: number;
  isLoading?: boolean;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  isLast,
  isSelected,
  onToggleSelection,
  versionState,
  showConnector,
  connectorProgress,
  connectorDuration = 1400,
  isLoading = false,
}) => {
  const safeVersionState: VersionState =
    versionState === 'active' || versionState === 'done' ? versionState : 'pending';

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4">
      <TimelineMarker
        icon={entry.icon}
        versionState={safeVersionState}
        showConnector={showConnector}
        connectorProgress={connectorProgress}
        connectorDuration={connectorDuration}
      />

      <div className={`flex flex-col ${isLast ? '' : 'pb-12'}`}>
        <div className={`rounded-xl p-5 transition-all duration-500 ${getCardClasses(safeVersionState)}`}>
          <TimelineHeader
            entry={entry}
            versionState={safeVersionState}
            isLast={isLast}
            isSelected={isSelected}
            onToggleSelection={onToggleSelection}
            isLoading={isLoading}
          />

          {(safeVersionState === 'active' || safeVersionState === 'done' || isLoading) && (
            <TimelineExpandedDetails
              entry={entry}
              isLoading={isLoading}
              onCopyCid={() => copyToClipboard(entry.ipfsCid)}
            />
          )}

          {safeVersionState !== 'active' && !isLast && <TimelineSummaryDetails entry={entry} />}
        </div>
      </div>
    </div>
  );
};

export default TimelineEntry;
