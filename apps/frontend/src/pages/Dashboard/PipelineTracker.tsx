import * as React from "react";
import { StageTracker, useStageAnimation } from "../../Components/common/StageAnimation";
import type { StageItem } from "../../Components/common/StageAnimation";
import type { PipelineStage } from "types";

interface Props {
    initialStages: PipelineStage[];
}

export const PipelineTracker: React.FC<Props> = ({ initialStages }) => {
    
    const stageItems: StageItem[] = React.useMemo(() => 
        initialStages.map(stage => ({
            id: stage.id,
            label: stage.label,
            time: stage.time,
            icon: stage.icon,
            activeIcon: stage.id === 4 ? 'pen_size_2' : stage.id === 5 ? 'rocket_launch' : 'progress_activity',
            doneIcon: stage.id === 3 ? 'verified_user' : 'check',
        })),
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
