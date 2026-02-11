export interface DeploymentItem {
	id: string;
	environment: string;
	status: "success" | "failed" | "running" | "pending";
	startedAt: string;
	finishedAt?: string;
	author: string;
}

export const mockDeployments: DeploymentItem[] = [
	{
		id: "dep_001",
		environment: "staging",
		status: "success",
		startedAt: "2024-01-12T10:12:00Z",
		finishedAt: "2024-01-12T10:15:42Z",
		author: "0x71C...49b2"
	},
	{
		id: "dep_002",
		environment: "production",
		status: "running",
		startedAt: "2024-02-02T09:01:00Z",
		author: "0x32A...88f1"
	},
	{
		id: "dep_003",
		environment: "canary",
		status: "failed",
		startedAt: "2024-01-25T14:30:00Z",
		finishedAt: "2024-01-25T14:33:10Z",
		author: "0x71C...49b2"
	}
];
