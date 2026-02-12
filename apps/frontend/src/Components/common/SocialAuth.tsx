import * as React from "react";
import { Button } from "../common/Button";
import { GitHubIcon, GoogleIcon } from "../icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const SocialAuth: React.FC = () => {
    const returnTo = typeof window !== 'undefined' ? window.location.pathname : '/';
    const googleHref = `${API_BASE_URL}/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
    return (
        <div className="space-y-3 mb-8">
            <Button
                variant="social"
                className="w-full"
                icon={<GitHubIcon className="size-5" />}
            >
                Continue with GitHub
            </Button>
            <a href={googleHref}>
              <Button
                  variant="social"
                  className="w-full"
                  icon={<GoogleIcon className="size-5" />}
              >
                  Continue with Google
              </Button>
            </a>
        </div>
    );
};
