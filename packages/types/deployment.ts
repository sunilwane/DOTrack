export interface Deployment {
    id: string;
    projectId: string;
    requestedBy: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    timestamp: string;
}
