export interface PipelineStage {
    id: number;
    label: string;
    time: string;
    status: 'pending' | 'active' | 'done';
    icon: string;
}
