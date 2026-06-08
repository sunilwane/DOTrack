interface ConfirmPopUpHeaderProps {
  onClose: () => void;
}

export const ConfirmPopUpHeader = ({ onClose }: ConfirmPopUpHeaderProps) => (
  <div className="flex items-center justify-between border-b border-white/5 p-5">
    <h3 className="font-display text-base font-bold text-white">Confirm Deployment Approval</h3>
    <button
      className="rounded-lg text-white/20 transition-colors hover:bg-white/5 hover:text-white"
      onClick={onClose}
    >
      <span className="material-symbols-outlined pt-2">close</span>
    </button>
  </div>
);
