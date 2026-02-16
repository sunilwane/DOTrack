import * as React from "react";
import { Button } from "../common/Button";
import { GitHubIcon, GoogleIcon } from "../icons";

const API_BASE_URL = "https://backend-production-0dbd.up.railway.app";

export const SocialAuth: React.FC = () => {
  const returnTo =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const googleHref = `${API_BASE_URL}/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
  const githubHref = `${API_BASE_URL}/api/auth/github?returnTo=${encodeURIComponent(returnTo)}`;
  return (
         <div className="flex flex-col gap-3 mb-8">
            <a href={githubHref} className="block">
                <Button
                 variant="social"
                 className="w-full"
                  icon={<GitHubIcon className="size-5" />}
             >
                Continue with GitHub
                 </Button>
              </a>

            <a href={googleHref} className="block">
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
