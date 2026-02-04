function Topbar() {
    return (
        <header className="flex items-center justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4">
            <div className="flex items-center gap-6">
                <h2 style={{ fontSize: '0.8em' }} className="text-slate-900 dark:text-white  font-bold">Project Overview</h2>
                <div className="h-6 w-px bg-slate-800"></div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-sm text-primary">hub</span>
                    <span className="text-xs font-medium dark:text-slate-300">Mainnet-v2.0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <label className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-500 text-lg">
                        search
                    </span>
                    <input
                    style={{fontSize: '0.8em'}}
                        className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 border-none  focus:ring-1 focus:ring-primary text-slate-900 dark:text-white outline-none placeholder-slate-500"
                        placeholder="Search deployments..."
                    />
                </label>

                <button style={{fontSize: '0.8em'}} className="flex items-center justify-center rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer border-none">
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    <span>New Pipeline</span>
                </button>

                <div className="size-10 rounded-full border-2 border-primary p-0.5 cursor-pointer">
                    <div
                        className="w-full h-full rounded-full bg-center bg-cover"
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
