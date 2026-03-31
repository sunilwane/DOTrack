import * as React from "react";
import { StageTracker, useStageAnimation } from "../../Components/common/StageAnimation";
import type { StageItem } from "../../Components/common/StageAnimation";
import type { PipelineStage } from "types";
import { buildPipelineStageItems } from "./pipelineTrackerUtils";

interface Props {
    initialStages: PipelineStage[];
}

export const PipelineTracker: React.FC<Props> = ({ initialStages }) => {
    
    const stageItems: StageItem[] = React.useMemo(() => 
        buildPipelineStageItems(initialStages),
        [initialStages]
    );

    const { states } = useStageAnimation(stageItems, {
        loadingDuration: 1500,
        connectorDuration: 1400,
        restartDelay: 2000,
        loop: true,
    });

    return (
        <StageTracker
            items={stageItems}
            states={states}
            orientation="horizontal"
            showLabels={true}
            showTime={true}
            connectorDuration={1400}
        />
    );
};

export default PipelineTracker;
