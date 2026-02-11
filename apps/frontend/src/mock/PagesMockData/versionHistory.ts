export interface VersionEntry {
    version: string;
    title: string;
    releaseDate: string;
    ipfsCid: string;
    wallet: string;
    walletGradient: string;
    description: string;
    blockNumber: string;
    isActive?: boolean;
    icon: string;
}

export const mockVersions: VersionEntry[] = [
    {
        version: "v1.2.4",
        title: "Optimization Patch",
        releaseDate: "Oct 24, 2023 • 14:22 UTC",
        ipfsCid: "QmXoyp...M8z7",
        wallet: "0x71C...49b2",
        walletGradient: "from-indigo-500 to-purple-500",
        description: "Optimized the Docker build caching layer and updated the security scanner to v4.2. Reduced pipeline latency by ~14% on average nodes.",
        blockNumber: "18,452,901",
        isActive: true,
        icon: "token"
    },
    {
        version: "v1.2.3",
        title: "Bug Fixes",
        releaseDate: "Oct 20, 2023 • 09:10 UTC",
        ipfsCid: "QmZ4tB...3kLq",
        wallet: "0x71C...49b2",
        walletGradient: "from-indigo-500 to-purple-500",
        description: "",
        blockNumber: "18,451,052",
        isActive: false,
        icon: "history"
    },
    {
        version: "v1.2.2",
        title: "Feature Update",
        releaseDate: "Oct 15, 2023 • 22:45 UTC",
        ipfsCid: "QmY3sA...9pKw",
        wallet: "0x32A...88f1",
        walletGradient: "from-green-500 to-teal-500",
        description: "Integrated decentralized storage hooks and expanded the environment variable encryption scheme. Added support for Arbitrum L2 testnet nodes.",
        blockNumber: "18,449,822",
        isActive: false,
        icon: "history"
    },
    {
        version: "v1.2.1",
        title: "Initial Beta",
        releaseDate: "Oct 02, 2023 • 11:15 UTC",
        ipfsCid: "QmW7vR...2nMp",
        wallet: "0x71C...49b2",
        walletGradient: "from-indigo-500 to-purple-500",
        description: "",
        blockNumber: "18,447,101",
        isActive: false,
        icon: "rocket_launch"
    },
    {
        version: "v1.2.0",
        title: "Core Engine Genesis",
        releaseDate: "Sep 28, 2023 • 18:00 UTC",
        ipfsCid: "QmP9kL...5tRx",
        wallet: "0x71C...49b2",
        walletGradient: "from-indigo-500 to-purple-500",
        description: "",
        blockNumber: "18,445,432",
        isActive: false,
        icon: "flag"
    }
];
