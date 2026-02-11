import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../../Components/layout/AuthLayout";
import { Button } from "../../Components/common/Button";
import { Input } from "../../Components/common/Input";
import { SocialAuth } from "../../Components/common/SocialAuth";
import { Divider } from "../../Components/common/Divider";

import { SignInFields } from "../../mock/PagesMockData/AuthData";

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <AuthLayout
            title="Welcome Back"
            description="Continue building the trustless future."
        >
            <SocialAuth />

            <Divider>or</Divider>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {SignInFields.map((field, index) => (
                    <Input
                        key={index}
                        {...field}
                    />
                ))}

                <Button type="submit" className="w-full mt-2" size="lg">
                    Sign In
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
