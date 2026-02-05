import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { Input } from "../../Components/common/Input";
import { SocialAuth } from "../../Components/common/SocialAuth";
import { Divider } from "../../Components/common/Divider";
import { SmoothScrollProvider } from "../../Components/layout/SmoothScrollProvider";

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    // TODO: Replace with real authentication flow
    // 1. Add state for email/password (useState)
    // 2. Perform client-side validation
    // 3. Call authentication API (authService.signIn)
    // 4. Handle success: store token securely, navigate to /dashboard
    // 5. Handle failure: display error message to user
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: immediate navigation (REMOVE IN PRODUCTION)
        navigate("/dashboard");
    };

    return (
        <SmoothScrollProvider>
            <AuthLayout
            title="Welcome Back"
            description="Continue building the trustless future."
        >
            <SocialAuth />

            <Divider>or</Divider>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    label="Email address"
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                />

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <Input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <Button type="submit" className="w-full mt-2" size="lg">
                    Sign In
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 mb-4">
                    New here? <a className="text-primary hover:underline font-bold cursor-pointer" onClick={() => navigate("/signup")}>Create an account</a>
                </p>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-full text-slate-300 font-bold"
                        onClick={() => navigate("/connect")}
                        icon={<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>}
                    >
                        Connect Wallet instead
                    </Button>
                </div>
            </div>
            </AuthLayout>
        </SmoothScrollProvider>
    );
};

export default SignIn;
