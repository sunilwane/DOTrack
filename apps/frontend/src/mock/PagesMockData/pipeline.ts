export interface PipelineStage {
    id: string;
    name: string;
    status: "queued" | "running" | "success" | "failed";
    durationSeconds?: number;
}

export const mockPipelineStages: PipelineStage[] = [
    { id: "s1", name: "Checkout", status: "success", durationSeconds: 12 },
    { id: "s2", name: "Install", status: "success", durationSeconds: 45 },
    { id: "s3", name: "Build", status: "running" },
    { id: "s4", name: "Test", status: "queued" }
];
