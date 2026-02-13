export interface SignerInfo {
    name: string;
    role: string;
    verified?: boolean;
    disabled?: boolean;
}

export interface PipelineVersion {
    key: string;
    label: string;
}

export interface RequestProjectInfo {
    name: string;
}
