import type { AnimatedStage } from '../../../Components/common/StageAnimation';
import { mockVersions } from '../../../mock/PagesMockData/versionHistory';
import TimelineEntry from '../TimelineEntry';

interface VersionHistoryTimelineProps {
  states: AnimatedStage[];
  selectedVersions: string[];
  isLoading: boolean;
  onToggleSelection: (version: string) => void;
}

const VersionHistoryTimeline = ({
  states,
  selectedVersions,
  isLoading,
  onToggleSelection,
}: VersionHistoryTimelineProps) => (
  <div className="px-6 py-8">
    <div className="flex flex-col relative">
      {mockVersions.map((entry, index) => {
        const state = states.find((item) => item.id === entry.version);
        const versionState = state?.status || 'pending';
        const progress = state?.connectorProgress || 0;

        return (
          <TimelineEntry
            key={entry.version}
            entry={entry}
            isLast={index === mockVersions.length - 1}
            isSelected={selectedVersions.includes(entry.version)}
            onToggleSelection={() => onToggleSelection(entry.version)}
            versionState={versionState}
            showConnector={index < mockVersions.length - 1}
            connectorProgress={progress}
            connectorDuration={1400}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  </div>
);

export default VersionHistoryTimeline;
