
import * as React from "react";
import { mockDeployments, type DeploymentItem } from "../../mock/PagesMockData/deployments";

const Deployments: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Deployments</h1>
            <div className="space-y-3">
                {mockDeployments.map((d: DeploymentItem) => (
                    <div key={d.id} className="p-3 bg-white dark:bg-slate-800 border rounded-lg flex justify-between items-center">
                        <div>
                            <div className="font-bold">{d.environment} <span className="text-xs text-slate-400">({d.id})</span></div>
                            <div className="text-sm text-slate-500">Started: {new Date(d.startedAt).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold capitalize">{d.status}</div>
                            <div className="text-xs text-slate-400">Author: {d.author}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deployments;
