import { useEffect, useRef, useState } from "react";
import type { PipelineStage } from "types";

export function usePipelineAnimation(initialStages: PipelineStage[]) {
    const [stages, setStages] = useState<PipelineStage[]>(initialStages);
    const intervalRef = useRef<number | null>(null);
    const restartTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let currentStageIndex = 0;

        const runAnimation = () => {
            setStages(prev => prev.map(s => ({
                ...s,
                status: "pending",
                time: s.id === 5 ? "Queued" : "Pending",
                icon: s.id === 3 ? "verified_user" : s.id === 4 ? "pen_size_2" : s.id === 5 ? "rocket_launch" : "check"
            })));
            currentStageIndex = 0;

            intervalRef.current = window.setInterval(() => {
                setStages(prev => {
                    const newStages = [...prev];

                    if (currentStageIndex >= newStages.length) {
                        if (currentStageIndex === newStages.length && newStages[currentStageIndex - 1]) {
                            newStages[currentStageIndex - 1].status = "done";
                            newStages[currentStageIndex - 1].time = "Complete";
                            newStages[currentStageIndex - 1].icon = "check";
                        }
                        if (intervalRef.current) {
                            window.clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        restartTimeoutRef.current = window.setTimeout(runAnimation, 3000) as unknown as number;
                        return newStages;
                    }

                    if (currentStageIndex > 0) {
                        newStages[currentStageIndex - 1].status = "done";
                        const timeAgo = ["2m ago", "1m ago", "45s ago", "30s ago"];
                        newStages[currentStageIndex - 1].time = timeAgo[currentStageIndex - 1] || "Just now";
                        newStages[currentStageIndex - 1].icon = "check";
                        if (newStages[currentStageIndex - 1].id === 3) {
                            newStages[currentStageIndex - 1].icon = "verified_user";
                        }
                    }

                    newStages[currentStageIndex].status = "active";
                    if (currentStageIndex === 3) {
                        newStages[currentStageIndex].time = "Pending Signature";
                        newStages[currentStageIndex].icon = "pen_size_2";
                    } else if (currentStageIndex === 4) {
                        newStages[currentStageIndex].time = "Deploying...";
                        newStages[currentStageIndex].icon = "rocket_launch";
                    } else {
                        newStages[currentStageIndex].time = "Running...";
                        newStages[currentStageIndex].icon = "progress_activity";
                    }

                    currentStageIndex++;
                    return newStages;
                });
            }, 2500) as unknown as number;
        };

        runAnimation();

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            if (restartTimeoutRef.current) window.clearTimeout(restartTimeoutRef.current);
        };
    }, [initialStages]);

    return stages;
}
