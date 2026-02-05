import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";

function Topbar() {
    return (
<<<<<<< HEAD:apps/frontend/src/Components/layout/Topbar.tsx
        <header className="flex items-center justify-between sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 sm:px-8 py-4">
            {/* Left Side: Title & Badge */}
=======
        <header className="flex items-center justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4">
>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Topbar.tsx
            <div className="flex items-center gap-6">
                <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight uppercase tracking-wider">Project Overview</h2>
                <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-sm text-primary">hub</span>
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-300">Mainnet-v2.0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
<<<<<<< HEAD:apps/frontend/src/Components/layout/Topbar.tsx
                {/* Search Bar */}
                <label className="relative hidden md:flex items-center">
=======
                <label className="relative flex items-center">
>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Topbar.tsx
                    <span className="material-symbols-outlined absolute left-3 text-slate-500 text-lg">
                        search
                    </span>
                    <input
                        className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder-slate-500"
                        placeholder="Search deployments..."
                    />
                </label>

<<<<<<< HEAD:apps/frontend/src/Components/layout/Topbar.tsx
                {/* New Pipeline Button */}
                <Button variant="secondary" size="md" icon={<span className="material-symbols-outlined">add_circle</span>}>
                    <span className="hidden sm:inline">New Pipeline</span>
                </Button>

                {/* User Profile */}
                <div className="size-10 rounded-full border-2 border-primary p-0.5 cursor-pointer hover:scale-105 transition-transform">
=======
                <button style={{fontSize: '0.8em'}} className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer border-none">
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    <span>New Pipeline</span>
                </button>

                <div className="size-10 rounded-full border-2 border-primary p-0.5 cursor-pointer">
>>>>>>> 06208e11d80f527e765229f62409c1606dac0376:apps/frontend/src/Components/common/Topbar.tsx
                    <div
                        className="w-full h-full rounded-full bg-center bg-cover bg-slate-800"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJR0Ge0I6xP7MdoQKYC5WPBiOAbudEDdJD4siBJBiWfm32iVI0yMmOfFoIJlMje8zYAxp_2QcGJpa8rWrpev9w0FrGqN9ce71WxJa5YWUJTfnGAVk6fJSufEFpOXF7qW_ss0Q_2WOfCL-y--rcqatUCVoAF90SLvIn7meWJTOB9mTdY-7CDLN7bO-2NTnkur4qLMFdfbOpkwDccrmXUOaoeaW_JXhIKxK3jjiy_MDsyshsfR5bb8FiqdFod5rskS5xgzqT1ot2N3M")',
                        }}
                    ></div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
