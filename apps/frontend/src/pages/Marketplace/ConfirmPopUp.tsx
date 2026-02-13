import React, { useEffect } from "react";
import { useLenis } from "lenis/react";
import type { TemplateCard } from "types";

interface ConfirmPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  template: TemplateCard | null;
}

export const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
  isOpen,
  onClose,
  onConfirm,
  template
}) => {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen && lenis) {
      lenis.stop();
    } else if (lenis) {
      lenis.start();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-[440px] bg-[#1a1f2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 mx-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h3 className="text-base font-bold font-display text-white">Confirm Deployment Approval</h3>
          <button
            className="text-white/20 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            onClick={onClose}
          >
            <span className="material-symbols-outlined pt-2">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Project</span>
              <p className="text-xs text-white font-medium bg-white/5 p-3 rounded-lg border border-white/5">
                {template.title}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Pipeline Hash (IPFS)</span>
              <div className="flex items-center justify-between text-[10px] font-mono text-primary bg-primary/5 p-3 rounded-lg border border-primary/10">
                <span className="truncate mr-2">QmXoyp847FvR92hZpL19sK3q2M5n7bXyWpQ...</span>
                <span className="material-symbols-outlined text-sm cursor-pointer">content_copy</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
              <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">On-Chain Action</span>
            </div>
            <p className="text-xs font-medium pl-8">
              Executing Smart Contract: <span className="text-primary">DeployApprove()</span>
            </p>
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Estimated Gas Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-white">0.0032 ETH</span>
                <span className="text-[10px] text-white/40">($7.42 USD)</span>
              </div>
            </div>
            <div className="text-green-500 flex items-center gap-1 text-[8px] font-bold uppercase tracking-tight">
              <span className="material-symbols-outlined text-sm">speed</span> Likely &lt; 30s
            </div>
          </div>

          <div className="flex gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
            <span className="material-symbols-outlined text-amber-500 shrink-0">warning</span>
            <p className="text-[10px] text-amber-200/80 leading-relaxed">
              This action is immutable and will trigger CI/CD pipeline execution. Ensure source repository is secure.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs hover:bg-white/5 transition-colors"
              onClick={onClose}
            >
              Reject
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              onClick={onConfirm}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.54 4.88l-1.95 5.51L24 8.75l5.54-3.87z" fill="#E17726"></path>
                <path d="M2.46 4.88l1.95 5.51L8 8.75 2.46 4.88z" fill="#E27625"></path>
                <path d="M26.24 21.08l-2.07 8.07 4.95-6.53-2.88-1.54z" fill="#E27625"></path>
                <path d="M5.76 21.08l2.07 8.07-4.95-6.53 2.88-1.54z" fill="#E27625"></path>
                <path d="M12.44 14.18l-1.42 4.41 5 1.59 4.96-1.59-1.42-4.41h-7.12z" fill="#E27625"></path>
                <path d="M24.78 11.23l-3.32 1.49 1.55 4.81 1.77-6.3z" fill="#E27625"></path>
                <path d="M7.22 11.23l3.32 1.49-1.55 4.81-1.77-6.3z" fill="#E27625"></path>
                <path d="M16 22.84l-4.98-2.65-.63 1.94 5.61 1.79 5.61-1.79-.63-1.94-4.98 2.65z" fill="#D5BFB2"></path>
                <path d="M16 30.15l4.55-6.02-4.55 2.41-4.55-2.41L16 30.15z" fill="#233447"></path>
                <path d="M16 20.18l-5-1.59-.26 1.6 5.26 2.65 5.26-2.65-.26-1.6-5 1.59z" fill="#161616"></path>
              </svg>
              Confirm & Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};