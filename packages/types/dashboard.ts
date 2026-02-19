export interface DashboardStats {
    projectName: string;
    githubRepo: string;
    walletAddress: string;
    blockNumber: string;
    gasEstimate: string;
    priority: string;
}

export type DashboardAccent = "blue" | "emerald" | "yellow";

export interface MainDashboardMetric {
    title: string;
    value: string;
    subtitle: string;
    trendLabel: string;
    accent: DashboardAccent;
    icon: "box" | "shield-check" | "store" | "star";
}

export interface MainDashboardActivity {
    id: number;
    title: string;
    description: string;
    time: string;
    actionLabel: string;
    actionAccent: "blue" | "emerald";
    accent: "blue" | "emerald";
    icon: "bitcoin" | "code" | "rocket" | "landmark";
}

export interface MainDashboardQuickAction {
    id: number;
    label: string;
    icon: "plus-square" | "upload";
    variant: "primary" | "outline";
}

export interface MainDashboardNodeStat {
    label: string;
    value: string;
    valueAccent: "default" | "emerald";
}

export interface MainDashboardFooterStat {
    label: string;
    value: string;
}

export interface RecentDeployment {
    id: string;
    status: string;
    approver: string;
    cid: string;
    time: string;
    success: boolean;
}
