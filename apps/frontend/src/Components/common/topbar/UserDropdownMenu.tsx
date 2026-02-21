interface UserDropdownMenuProps {
  email?: string;
  userId?: string;
  onClose: () => void;
  onSignOut: () => void;
}

export const UserDropdownMenu = ({
  email,
  userId,
  onClose,
  onSignOut,
}: UserDropdownMenuProps) => (
  <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
    <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{email || 'User'}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {userId ? `ID: ${userId.substring(0, 8)}...` : ''}
      </p>
    </div>

    <div className="py-1">
      <button
        onClick={onClose}
        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <span className="material-symbols-outlined text-lg">person</span>
        <span>Profile</span>
        <span className="ml-auto text-xs text-slate-400">(Coming Soon)</span>
      </button>

      <button
        onClick={onSignOut}
        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        <span className="material-symbols-outlined text-lg">logout</span>
        <span>Sign Out</span>
      </button>
    </div>
  </div>
);
