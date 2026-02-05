export interface AuditEntry {
    id: string;
    timestamp: string;
    block: string;
    event: string;
    wallet: string;
    ipfs: string;
    proof: string;
    proofHash?: string;
    status: string;
}

export interface AuditStatItem {
    label: string;
    value: string;
    category: 'deployments' | 'proofs' | 'data';
    chipText: string;
    chipType: 'success' | 'slate' | 'purple';
}
