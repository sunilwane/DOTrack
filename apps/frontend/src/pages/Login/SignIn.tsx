import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button, Divider, FormError, Input, LoadingSpinner, SocialAuth } from "../../Components/common";
import { useAuth } from "../../contexts/AuthContext";
import { useFormSubmit } from "../../hooks";
import { SignInFields } from "../../mock/PagesMockData/AuthData";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { signin, isAuthenticated, isLoading } = useAuth();

    const { handleSubmit: submitForm, loading, error, clearError } = useFormSubmit(
        async (data: { email: string; password: string }) => {
            await signin(data);
            navigate("/dashboard");
        }
    );

    React.useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <LoadingSpinner fullScreen message="Loading..." />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await submitForm({ email, password });
        } catch {
            // Error is handled by useFormSubmit
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
                <FormError error={error} />
                
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
                    New here? <button type="button" onClick={() => navigate('/signup')} className="text-primary hover:underline font-bold cursor-pointer">Create an account</button>
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
