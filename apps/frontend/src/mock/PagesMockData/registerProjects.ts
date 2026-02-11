export interface RegisterProjectData {
    projectName: string;
    sourceRepository: string;
    network: {
        name: string;
        status: "active" | "inactive";
    };
    gasEstimate: {
        eth: string;
        usd: string;
    };
    estimatedTime: string;
}

export const mockRegisterProjectData: RegisterProjectData = {
    projectName: "Hyperion-Core-v2",
    sourceRepository: "github.com/hyperion/core",
    network: {
        name: "Ethereum Mainnet",
        status: "active"
    },
    gasEstimate: {
        eth: "0.0042 ETH",
        usd: "$12.45 USD"
    },
    estimatedTime: "30-60 seconds"
};

export interface RegistrationStep {
    step: number;
    title: string;
    icon: string;
    status: "completed" | "active" | "pending";
}

export const mockRegistrationSteps: RegistrationStep[] = [
    {
        step: 1,
        title: "Connect Source",
        icon: "check_circle",
        status: "completed"
    },
    {
        step: 2,
        title: "Metadata",
        icon: "check_circle",
        status: "completed"
    },
    {
        step: 3,
        title: "Blockchain",
        icon: "account_balance_wallet",
        status: "active"
    }
];
