import type { PipelineVersion, SignerInfo, RequestProjectInfo } from "types";

export const pipelineVersions: PipelineVersion[] = [
    {
        key: "v2.1.0",
        label: "v2.1.0 (QmXoyp...7Vz4) - Stable Production Build",
    },
    {
        key: "v2.0.9",
        label: "v2.0.9 (QmZ82k...9Aa1) - Legacy Build",
    },
    {
        key: "v2.2.0-rc",
        label: "v2.2.0-rc (QmWq11...3Bq9) - Release Candidate",
    },
];

export const signers: SignerInfo[] = [
    {
        name: "0xLead...Dev1",
        role: "Core Maintainer",
        verified: true,
    },
    {
        name: "0xSec...Audit",
        role: "Security Lead",
        verified: false,
    },
    {
        name: "0xOps...Admin",
        role: "Ops Representative",
        verified: false,
        disabled: true,
    },
];

export const projectInfo: RequestProjectInfo = {
    name: "OpenSource-Protocol-v2",
};
