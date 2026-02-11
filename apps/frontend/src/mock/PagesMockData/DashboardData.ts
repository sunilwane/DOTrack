import type { PipelineStage, DashboardStats as DashboardStatsType, RecentDeployment } from "types";

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
