import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { Input } from "../../Components/common/Input";
import { SocialAuth } from "../../Components/common/SocialAuth";
import { Divider } from "../../Components/common/Divider";
import { useAuth } from "../../contexts/AuthContext";
import { authService } from '../../services/authService';
import { SignUpFields } from "../../mock/PagesMockData/AuthData";

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await authService.signup({ name, email, password });
            navigate('/login');
        } catch (err: any) {
            setError(err.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Join the Future of DevOps"
            description="Create your account to start shipping decentralized."
            maxWidth="max-w-[450px]"
        >
            <SocialAuth />

            <Divider>or use email</Divider>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                {SignUpFields.map((field, index) => (
                    <Input
                        key={index}
                        name={field.id}
                        {...field}
                    />
                ))}

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

                <Button type="submit" className="w-full mt-4" size="lg" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
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
    );
};

export default SignUp;
