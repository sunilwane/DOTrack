import * as React from "react";
import type { WalletOption as WalletOptionType } from "types";

export const WalletOptionCard: React.FC<WalletOptionType> = ({ name, description, icon, iconColor }) => (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 min-h-[72px] py-2 justify-between transition-all group">
        <div className="flex items-center gap-4">
            <div className="text-white flex items-center justify-center rounded-lg bg-[#282e39] shrink-0 size-12 shadow-inner">
                <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-white text-base font-semibold leading-normal line-clamp-1">{name}</p>
                <p className="text-[#9ca6ba] text-xs font-normal leading-normal">{description}</p>
            </div>
        </div>
        <div className="shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-white/40">chevron_right</span>
        </div>
    </div>
);

export default WalletOptionCard;
