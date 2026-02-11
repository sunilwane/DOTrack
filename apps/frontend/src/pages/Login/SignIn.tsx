import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { Input } from "../../Components/common/Input";
import { SocialAuth } from "../../Components/common/SocialAuth";
import { Divider } from "../../Components/common/Divider";
import { useAuth } from "../../contexts/AuthContext";
import { SignInFields } from "../../mock/PagesMockData/AuthData";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { signin, isAuthenticated, isLoading } = useAuth();
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
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signin({ email, password });
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || 'Sign in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            description="Continue building the trustless future."
        >
            <SocialAuth />

            <Divider>or</Divider>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                {SignInFields.map((field, index) => (
                    <Input
                        key={index}
                        name={field.id}
                        {...field}
                    />
                ))}

                <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 mb-4">
                    New here? <Link to="/signup" className="text-primary hover:underline font-bold cursor-pointer">Create an account</Link>
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
    );
};

export default SignIn;
