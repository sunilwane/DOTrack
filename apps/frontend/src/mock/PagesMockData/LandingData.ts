import type { LandingStatItem, ComparisonCardData, LandingFeature, HeroTerminalLog, FooterColumn } from "types";

export const HeroTerminalLogs: HeroTerminalLog[] = [
    {
        icon: "check_circle",
        text: "[SUCCESS] IPFS Hash Resolved: QmXoyp...",
        color: "text-emerald-400"
    },
    {
        icon: "shield",
        text: "[VERIFYING] Multi-sig approval from Node Operator...",
        color: "text-blue-400",
        truncate: true
    },
    {
        icon: "hourglass_empty",
        text: "[PENDING] Committing transaction to Ethereum L2...",
        color: "text-slate-500"
    }
];

export const LandingStats: LandingStatItem[] = [
    { label: "Active Pipelines", value: "1,240+", border: false },
    { label: "Nodes Online", value: "850", border: true },
    { label: "Deployments", value: "45.2k", border: true },
    { label: "TVL in Templates", value: "$2.4M", border: true }
];

export const ComparisonData: { centralized: ComparisonCardData; nexus: ComparisonCardData } = {
    centralized: {
        variant: "centralized" as const,
        title: "The Centralized Risk",
        items: [
            { icon: "lock", title: "Opaque Scripts", desc: "Traditional CI/CD hidden runners can be compromised without notice." },
            { icon: "cloud_off", title: "Single Point of Failure", desc: "Platform outages halt your entire development lifecycle." },
            { icon: "gavel", title: "Centralized Censorship", desc: "Service providers can block your builds based on arbitrary policy." }
        ]
    },
    nexus: {
        variant: "nexus" as const,
        title: "The Nexus Advantage",
        items: [
            { icon: "hub", title: "Decentralized Verification", desc: "Multi-node consensus ensures every build step is audited." },
            { icon: "storage", title: "Immutable IPFS Storage", desc: "Templates are stored on a permanent web with verifiable hashes." },
            { icon: "public", title: "Censorship Resistant", desc: "Distributed runner network ensures your builds never stop." }
        ]
    }
};

export const LandingFeatures: LandingFeature[] = [
    { icon: "shield", title: "On-Chain Governance", description: "Pipeline changes must be approved by DAO participants or automated smart contract conditions." },
    { icon: "find_in_page", title: "Public Audit Trails", description: "Every log, build artifact, and deployment signature is stored with a permanent on-chain hash." },
    { icon: "shopping_cart", title: "Template Marketplace", description: "Buy and sell pre-verified, secure pipeline components created by the community." },
    { icon: "account_balance_wallet", title: "Gasless Deployments", description: "Leverage meta-transactions and L2 rollup technology for fast, low-cost CI/CD execution." },
    { icon: "api", title: "Cross-Chain Ready", description: "Deploy to EVM, Solana, Cosmos, and traditional cloud providers using the same trustless core." },
    { icon: "token", title: "Contributor Incentives", description: "Earn protocol tokens for running nodes or creating high-quality open source templates." }
];

export const FooterLinks: FooterColumn[] = [
    {
        title: "Platform",
        links: ["Features", "Marketplace", "Node Status"]
    },
    {
        title: "Resources",
        links: ["Documentation", "API Ref", "Whitepaper"]
    },
    {
        title: "Legal",
        links: ["Privacy", "Terms", "Security"]
    }
];

export const SocialIcons: string[] = ["hub", "groups", "article"];
