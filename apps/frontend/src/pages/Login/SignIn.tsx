import * as React from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <AuthLayout
            title="Welcome to DOTrack"
            description="Monitor deployments, pipelines, and project activity in a secure and modern way."
            maxWidth="max-w-[480px]"
        >
            <div className="-mt-2 mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 shadow-sm">
                    <ShieldCheck className="h-4 w-4" />
                    Secure access portal
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                    <LockKeyhole className="h-4 w-4" />
                    Sign In
                </button>
            </form>

            <div className="mt-5 text-center">
                <p className="text-sm text-slate-400">
                    New here?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="ml-1 font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignIn;