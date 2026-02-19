import { buildApiUrl } from './apiClient';
import { apiPaths } from './apiPaths';

class OAuthService {
  getGoogleAuthUrl(returnTo = '/'): string {
    return buildApiUrl(
      `${apiPaths.auth.google}?returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  getGithubAuthUrl(returnTo = '/'): string {
    return buildApiUrl(
      `${apiPaths.auth.github}?returnTo=${encodeURIComponent(returnTo)}`
    );
  }
}

export const oauthService = new OAuthService();
