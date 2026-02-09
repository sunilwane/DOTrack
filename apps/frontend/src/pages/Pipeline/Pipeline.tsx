
import * as React from "react";
import { mockPipelineStages, type PipelineStage } from "../../mock/PagesMockData/pipeline";

const Pipeline: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Pipeline</h1>
            <div className="space-y-2">
                {mockPipelineStages.map((s: PipelineStage) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-800">
                        <div>
                            <p className="font-bold">{s.name}</p>
                            <p className="text-sm text-slate-500">Stage ID: {s.id}</p>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                            {s.status}{s.durationSeconds ? ` • ${s.durationSeconds}s` : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pipeline;
