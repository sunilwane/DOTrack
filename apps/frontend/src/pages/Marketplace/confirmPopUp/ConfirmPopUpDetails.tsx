interface ConfirmPopUpDetailsProps {
  templateTitle: string;
}

export const ConfirmPopUpDetails = ({ templateTitle }: ConfirmPopUpDetailsProps) => (
  <>
    <div className="space-y-3">
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Project</span>
        <p className="rounded-lg border border-white/5 bg-white/5 p-3 text-xs font-medium text-white">
          {templateTitle}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">
          Pipeline Hash (IPFS)
        </span>
        <div className="flex items-center justify-between rounded-lg border border-primary/10 bg-primary/5 p-3 font-mono text-[10px] text-primary">
          <span className="mr-2 truncate">QmXoyp847FvR92hZpL19sK3q2M5n7bXyWpQ...</span>
          <span className="material-symbols-outlined cursor-pointer text-sm">content_copy</span>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <div className="mb-1 flex items-center gap-3">
        <span className="material-symbols-outlined text-xl text-primary">account_tree</span>
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">
          On-Chain Action
        </span>
      </div>
      <p className="pl-8 text-xs font-medium">
        Executing Smart Contract: <span className="text-primary">DeployApprove()</span>
      </p>
    </div>

    <div className="flex items-center justify-between px-1">
      <div className="flex flex-col">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">
          Estimated Gas Fee
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-white">0.0032 ETH</span>
          <span className="text-[10px] text-white/40">($7.42 USD)</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-tight text-green-500">
        <span className="material-symbols-outlined text-sm">speed</span> Likely &lt; 30s
      </div>
    </div>

    <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
      <span className="material-symbols-outlined shrink-0 text-amber-500">warning</span>
      <p className="text-[10px] leading-relaxed text-amber-200/80">
        This action is immutable and will trigger CI/CD pipeline execution. Ensure source
        repository is secure.
      </p>
    </div>
  </>
);
