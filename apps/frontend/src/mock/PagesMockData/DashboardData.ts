import type {
    DashboardStats as DashboardStatsType,
    MainDashboardActivity,
    MainDashboardFooterStat,
    MainDashboardMetric,
    MainDashboardNodeStat,
    MainDashboardQuickAction,
    PipelineStage,
    RecentDeployment
} from "types";

export const PipelineStages: PipelineStage[] = [
    { id: 1, label: "Build", time: "Pending", status: "pending", icon: "check" },
    { id: 2, label: "Test Suite", time: "Pending", status: "pending", icon: "check" },
    { id: 3, label: "Security Scan", time: "Pending", status: "pending", icon: "verified_user" },
    { id: 4, label: "On-Chain Gate", time: "Pending", status: "pending", icon: "pen_size_2" },
    { id: 5, label: "Deploy", time: "Queued", status: "pending", icon: "rocket_launch" },
];

export const RecentDeployments: RecentDeployment[] = [
    { id: "#881", status: "SUCCESS", approver: "0x4b9...9a12", cid: "QmXoyp...3Vp8", time: "2023-11-24 14:32:01", success: true },
    { id: "#880", status: "SUCCESS", approver: "0x71C...d897", cid: "QmNrg8...9Lk2", time: "2023-11-23 09:15:44", success: true },
    { id: "#879", status: "FAILED", approver: "0x71C...d897", cid: "QmZ6t2...6Hj1", time: "2023-11-22 18:02:12", success: false },
];

export const DashboardStats: DashboardStatsType = {
    projectName: "OpenSource-DApp-v1",
    githubRepo: "github.com/org/core-protocol",
    walletAddress: "0x71C765...d897",
    blockNumber: "18,452,901",
    gasEstimate: "~0.0042 ETH",
    priority: "Fastest"
};

export const MainDashboardMetrics: MainDashboardMetric[] = [
    {
        title: "Active Projects",
        value: "24",
        subtitle: "8 deploying now",
        trendLabel: "+12%",
        accent: "blue",
        icon: "box"
    },
    {
        title: "On-Chain Approvals",
        value: "1,402",
        subtitle: "Immutable verification",
        trendLabel: "Info",
        accent: "emerald",
        icon: "shield-check"
    },
    {
        title: "Marketplace Usage",
        value: "86",
        subtitle: "IPFS-stored configs",
        trendLabel: "Hot",
        accent: "blue",
        icon: "store"
    },
    {
        title: "Current Reputation",
        value: "4.92/5.0",
        subtitle: "Top 5% contributor",
        trendLabel: "GOLD",
        accent: "yellow",
        icon: "star"
    }
];

export const MainDashboardActivities: MainDashboardActivity[] = [
    {
        id: 1,
        title: "Transaction Confirmed",
        description: "Smart Contract 0x4b9...9a12 updated deployment state for #OpenSource-App.",
        time: "2m ago",
        actionLabel: "View on Etherscan",
        actionAccent: "blue",
        accent: "emerald",
        icon: "bitcoin"
    },
    {
        id: 2,
        title: "Pipeline Build Succeeded",
        description: "Project DEX-Frontend: Stage [Security Scan] completed successfully. Config saved to IPFS.",
        time: "14m ago",
        actionLabel: "View Logs",
        actionAccent: "blue",
        accent: "blue",
        icon: "code"
    },
    {
        id: 3,
        title: "Deployment Initiated",
        description: "Awaiting multi-sig approval for Core-Protocol-V2 mainnet release.",
        time: "45m ago",
        actionLabel: "Sign Now",
        actionAccent: "emerald",
        accent: "blue",
        icon: "rocket"
    },
    {
        id: 4,
        title: "Marketplace Royalty Paid",
        description: "0.025 ETH received for \"Rust-Wasm-Optimized\" template usage.",
        time: "2h ago",
        actionLabel: "Receipt",
        actionAccent: "blue",
        accent: "emerald",
        icon: "landmark"
    }
];

export const MainDashboardQuickActions: MainDashboardQuickAction[] = [
    { id: 1, label: "Create Project", icon: "plus-square", variant: "primary" },
    { id: 2, label: "Upload Pipeline", icon: "upload", variant: "outline" }
];

export const MainDashboardNodeStats: MainDashboardNodeStat[] = [
    { label: "IPFS Cluster", value: "99.9%", valueAccent: "emerald" },
    { label: "Validators", value: "2,481 Active", valueAccent: "default" }
];

export const MainDashboardFooterStats: MainDashboardFooterStat[] = [
    { label: "BLOCK HEIGHT", value: "18,452,901" },
    { label: "GAS", value: "12 GWEI" }
];
