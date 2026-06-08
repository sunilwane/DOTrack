import * as React from "react";
import { GitHubIcon, GoogleIcon } from "../icons";
import { oauthService } from "../../services/oauthService";

export const SocialAuth: React.FC = () => {
  const returnTo =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const googleHref = oauthService.getGoogleAuthUrl(returnTo);
  const githubHref = oauthService.getGithubAuthUrl(returnTo);

  const linkClassName =
    "inline-flex w-full items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 " +
    "bg-white dark:bg-white/5 px-5 py-3 text-sm font-medium text-slate-900 dark:text-white " +
    "transition-all hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95";

  return (
    <div className="mb-8 flex flex-col gap-3">
      <a href={githubHref} className={linkClassName}>
        <GitHubIcon className="mr-2 size-5" />
        Continue with GitHub
      </a>

      <a href={googleHref} className={linkClassName}>
        <GoogleIcon className="mr-2 size-5" />
        Continue with Google
      </a>
    </div>
  );
};
