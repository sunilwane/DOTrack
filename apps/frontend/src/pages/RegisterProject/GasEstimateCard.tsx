import * as React from "react";

interface GasEstimate {
    eth: string;
    usd: string;
}

interface GasEstimateCardProps {
    estimate: GasEstimate;
    estimatedTime: string;
}

export const GasEstimateCard: React.FC<GasEstimateCardProps> = ({ estimate, estimatedTime }) => (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-primary/30 bg-primary/5 dark:bg-primary/10">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">local_gas_station</span>
                </div>
                <div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">
                        Estimated Gas Fee
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                        Estimated based on current network congestion
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-primary text-xl font-bold">{estimate.eth}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">≈ {estimate.usd}</p>
            </div>
        </div>
        <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-amber-500 text-sm">info</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Deployment takes approx. {estimatedTime} after confirmation.
            </p>
        </div>
    </div>
);

export default GasEstimateCard;
