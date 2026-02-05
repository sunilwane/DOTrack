import { Button } from "../common/Button";

function Topbar() {
    return (
        <header className="flex items-center justify-between sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 sm:px-8 py-4">
            <div className="flex items-center gap-6">
                <h2 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">Project Overview</h2>
                <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-sm text-primary">hub</span>
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-300">Mainnet-v2.0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <label className="relative hidden md:flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-500 text-lg">
                        search
                    </span>
                    <input
                        className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder-slate-500"
                        placeholder="Search deployments..."
                    />
                </label>

                {/* New Pipeline Button */}
                <Button 
                    variant="secondary" 
                    size="md" 
                    icon={<span className="material-symbols-outlined" aria-hidden="true">add_circle</span>}
                    aria-label="New Pipeline"
                >
                    <span className="hidden sm:inline">New Pipeline</span>
                </Button>

                {/* User Profile */}
                <div className="size-10 rounded-full border-2 border-primary p-0.5 cursor-pointer hover:scale-105 transition-transform">
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
