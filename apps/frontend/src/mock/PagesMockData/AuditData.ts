import type { AuditEntry, AuditStatItem } from "types";

export const AuditStats: AuditStatItem[] = [
    {
        label: "Project Deployments",
        value: "1,248",
        chipText: "+12%",
        chipType: "success",
        category: "deployments"
    },
    {
        label: "On-Chain Proofs",
        value: "1,246",
        chipText: "100% Valid",
        chipType: "slate",
        category: "proofs"
    },
    {
        label: "IPFS Data Anchored",
        value: "70.2 GB",
        chipText: "Encrypted",
        chipType: "purple",
        category: "data"
    },
];

export const AuditLogsData: AuditEntry[] = [
    {
        id: "1",
        timestamp: "Oct 24, 2023 · 14:20",
        block: "#18234901",
        event: "DEPLOYMENT TRIGGERED",
        wallet: "0x71C...a29",
        ipfs: "QmXoyp...",
        proof: "Etherscan",
        proofHash: "0x4a92...11e9",
        status: "VERIFIED"
    },
    {
        id: "2",
        timestamp: "Oct 24, 2023 · 12:45",
        block: "#18234885",
        event: "APPROVAL SIGNED",
        wallet: "0x483...f1b",
        ipfs: "QmZ4tk...",
        proof: "Etherscan",
        proofHash: "0x9d21...fa02",
        status: "VERIFIED"
    },
    {
        id: "3",
        timestamp: "Oct 23, 2023 · 21:05",
        block: "#18234720",
        event: "REGISTRY LINKED",
        wallet: "0x123...bc4",
        ipfs: "QmWvba...",
        proof: "Polkascan",
        proofHash: "0xcc41...82b3",
        status: "VERIFIED"
    },
];
