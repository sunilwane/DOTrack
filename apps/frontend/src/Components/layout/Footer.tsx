import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-10 px-6 lg:px-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-white/40">
          <span className="material-symbols-outlined text-sm">security</span>
          <p className="text-xs uppercase tracking-[0.2em] font-bold">Powered by IPFS & Ethereum Smart Contracts</p>
        </div>
        <p className="text-white/20 text-[10px]">© 2026 DPipe Protocol. All pipeline executions are immutable and auditable on-chain.</p>
      </div>
    </footer>
  );
};