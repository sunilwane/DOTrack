import * as React from "react";
import type { RecentDeployment } from "types";
import { StatusBadge } from "../../Components/common/StatusBadge";

interface Props {
    deployments: RecentDeployment[];
}

export const RecentDeploymentsTable: React.FC<Props> = ({ deployments }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Approver</th>
                        <th className="px-6 py-4">CID</th>
                        <th className="px-6 py-4">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {deployments.map((row, index) => (
                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-[11px]">
                            <td className="px-6 py-4 font-mono text-slate-900 dark:text-slate-300">{row.id}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={row.success ? 'success' : 'error'} className="text-[9px] px-2 py-0.5">{row.status}</StatusBadge>
                            </td>
                            <td className="px-6 py-4 font-mono text-slate-500">{row.approver}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 font-mono text-primary cursor-pointer transition-all group">
                                    <span className='group-hover:underline'>{row.cid}</span>
                                    <span className="material-symbols-outlined text-[14px]">cloud_download</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-500">{row.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentDeploymentsTable;
