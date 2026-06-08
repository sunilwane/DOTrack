import { MetaMaskIcon } from './MetaMaskIcon';

interface ConfirmPopUpActionsProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmPopUpActions = ({ onClose, onConfirm }: ConfirmPopUpActionsProps) => (
  <div className="flex gap-3 pt-2">
    <button
      className="flex-1 rounded-xl px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-white/5"
      onClick={onClose}
    >
      Reject
    </button>
    <button
      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
      onClick={onConfirm}
    >
      <MetaMaskIcon />
      Confirm & Sign
    </button>
  </div>
);
