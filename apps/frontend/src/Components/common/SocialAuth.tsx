import * as React from "react";
import { Button } from "../common/Button";
import { GitHubIcon, GoogleIcon } from "../icons";
import { oauthService } from "../../services/oauthService";

export const SocialAuth: React.FC = () => {
  const returnTo =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const googleHref = oauthService.getGoogleAuthUrl(returnTo);
  const githubHref = oauthService.getGithubAuthUrl(returnTo);
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
