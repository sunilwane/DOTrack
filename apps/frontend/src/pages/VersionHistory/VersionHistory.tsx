import * as React from 'react';
import { useState } from 'react';
import { useStageAnimation } from '../../Components/common/StageAnimation';
import { usePageLoading } from '../../hooks/usePageLoading';
import { mockVersions } from '../../mock/PagesMockData/versionHistory';
import VersionHistoryHeader from './components/VersionHistoryHeader';
import VersionHistoryTimeline from './components/VersionHistoryTimeline';
import VersionSelectionBar from './components/VersionSelectionBar';

const VersionHistory: React.FC = () => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const { isLoading: isSimulatingLoad } = usePageLoading('version_history');

  const stageItems = React.useMemo(
    () =>
      mockVersions.map((version) => ({
        id: version.version,
        label: version.title,
      })),
    []
  );

  const { states } = useStageAnimation(stageItems, {
    loadingDuration: 1500,
    connectorDuration: 1400,
    restartDelay: 2000,
    loop: true,
  });

  const toggleVersionSelection = (version: string) => {
    setSelectedVersions((previous) =>
      previous.includes(version)
        ? previous.filter((value) => value !== version)
        : [...previous, version]
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark max-w-5xl mx-auto w-full">
      <VersionHistoryHeader isLoading={isSimulatingLoad} selectedCount={selectedVersions.length} />

      <VersionHistoryTimeline
        states={states}
        selectedVersions={selectedVersions}
        isLoading={isSimulatingLoad}
        onToggleSelection={toggleVersionSelection}
      />

      <VersionSelectionBar
        selectedVersions={selectedVersions}
        onClear={() => setSelectedVersions([])}
      />
    </div>
  );
};

export default VersionHistory;
