export interface DashboardStats {
    projectName: string;
    githubRepo: string;
    walletAddress: string;
    blockNumber: string;
    gasEstimate: string;
    priority: string;
}

export interface RecentDeployment {
    id: string;
    status: string;
    approver: string;
    cid: string;
    time: string;
    success: boolean;
}
