export const RegisterProjectSuccessToast = () => (
  <div className="fixed bottom-8 right-8 hidden items-center gap-4 rounded-xl bg-emerald-500 px-6 py-4 text-white shadow-xl">
    <span className="material-symbols-outlined">check_circle</span>
    <div className="text-sm">
      <p className="font-bold">Transaction Confirmed!</p>
      <p className="text-xs opacity-90">Project is being indexed by the network.</p>
    </div>
  </div>
);
