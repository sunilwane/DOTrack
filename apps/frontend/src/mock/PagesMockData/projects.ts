export interface ProjectCardData {
    name: string;
    repo: string;
    status: "healthy" | "failing" | "pending";
    pipelines: number;
    lastSync: string;
    icon: string;
    iconColor?: string;
    collaborators: number;
}

export const mockProjects: ProjectCardData[] = [
    {
        name: "Open-Ledger-Core",
        repo: "owner/open-ledger-core",
        status: "healthy",
        pipelines: 3,
        lastSync: "12m ago",
        icon: "deployed_code",
        collaborators: 2
    },
    {
        name: "Decentral-Node-API",
        repo: "owner/node-api",
        status: "failing",
        pipelines: 5,
        lastSync: "2h ago",
        icon: "api",
        iconColor: "text-red-500",
        collaborators: 1
    },
    {
        name: "Web3-Auth-Module",
        repo: "owner/auth-module",
        status: "pending",
        pipelines: 2,
        lastSync: "1d ago",
        icon: "security",
        iconColor: "text-amber-500",
        collaborators: 3
    },
    {
        name: "Chain-Indexer",
        repo: "owner/indexer",
        status: "healthy",
        pipelines: 0,
        lastSync: "Just now",
        icon: "data_object",
        collaborators: 1
    }
];
