interface UserAvatarButtonProps {
  email?: string;
  onClick: () => void;
}

export const UserAvatarButton = ({ email, onClick }: UserAvatarButtonProps) => (
  <div className="relative">
    <div
      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 p-0.5"
      aria-hidden="true"
    />
    <button
      onClick={onClick}
      className="relative size-10 rounded-full"
      aria-label="User menu"
      title="Click to open user menu"
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 text-sm font-bold text-slate-900 shadow-md">
        {email ? (
          <span className="text-sm font-bold uppercase">{email.charAt(0)}</span>
        ) : (
          <span className="material-symbols-outlined text-lg text-white">person</span>
        )}
      </div>
    </button>
  </div>
);
