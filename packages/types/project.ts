export interface Project {
    id: string;
    name: string;
    owner: string;
    pipelineHash: string;
    status: "ACTIVE" | "INACTIVE";
}
