import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { Input } from "../../Components/common/Input";
import { SocialAuth } from "../../Components/common/SocialAuth";
import { Divider } from "../../Components/common/Divider";
import { SmoothScrollProvider } from "../../Components/layout/SmoothScrollProvider";

const SignUp: React.FC = () => {
    const navigate = useNavigate();

    // TODO: Replace with real authentication flow
    // 1. Add state for name/email/password and validation errors (useState)
    // 2. Add loading state to prevent duplicate submissions
    // 3. Perform client-side validation (email format, password strength)
    // 4. Call authentication API (authService.signUp or fetch to /api/signup)
    // 5. Handle success: store token/session securely, navigate to /dashboard
    // 6. Handle failure: display validation/server errors to user
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: immediate navigation (REMOVE IN PRODUCTION)
        navigate("/dashboard");
    };

    return (
        <SmoothScrollProvider>
            <AuthLayout
            title="Join the Future of DevOps"
            description="Create your account to start shipping decentralized."
            maxWidth="max-w-[450px]"
        >
            <SocialAuth />

            <Divider>or use email</Divider>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@company.com"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    required
                />

                <div className="flex items-start gap-3 pt-2">
                    <input
                        className="mt-1 size-4 rounded border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-primary focus:ring-primary focus:ring-offset-0 dark:focus:ring-offset-background-dark"
                        id="tos"
                        type="checkbox"
                        required
                    />
                    <label className="text-xs leading-relaxed text-slate-500 dark:text-slate-400" htmlFor="tos">
                        I agree to the <a className="text-primary hover:underline font-bold" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-bold" href="#">Privacy Policy</a>.
                    </label>
                </div>

                <Button type="submit" className="w-full mt-4" size="lg">
                    Create Account
                </Button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-slate-200 dark:border-slate-800/50">
                <p className="text-sm text-slate-500">
                    Already have an account? <Link className="text-primary font-bold hover:underline" to="/login">Log in</Link>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 mt-8">
                    © 2024 Nexus CI/CD Protocol. Secured by Ethereum.
                </p>
            </div>
            </AuthLayout>
        </SmoothScrollProvider>
    );
};

export default SignUp;
