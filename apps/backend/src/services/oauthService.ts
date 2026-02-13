

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

export class OAuthService {
  
  buildGoogleAuthUrl(config: OAuthConfig, returnTo: string = '/'): string {
    const state = encodeURIComponent(JSON.stringify({ returnTo }));
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      config.clientId
    )}&redirect_uri=${encodeURIComponent(
      config.callbackUrl
    )}&response_type=code&scope=${encodeURIComponent(
      'openid profile email'
    )}&access_type=offline&prompt=consent&state=${state}`;
  }

  
  buildGithubAuthUrl(config: OAuthConfig, returnTo: string = '/'): string {
    const state = encodeURIComponent(JSON.stringify({ returnTo }));
    return `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
      config.clientId
    )}&redirect_uri=${encodeURIComponent(
      config.callbackUrl
    )}&scope=${encodeURIComponent('read:user repo user:email')}&state=${state}`;
  }

  
  async exchangeGoogleCode(config: OAuthConfig, code: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', config.clientId);
    params.append('client_secret', config.clientSecret);
    params.append('redirect_uri', config.callbackUrl);
    params.append('grant_type', 'authorization_code');

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange Google code for token');
    }

    return await response.json();
  }

 
  async exchangeGithubCode(config: OAuthConfig, code: string): Promise<any> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: config.callbackUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange GitHub code for token');
    }

    return await response.json();
  }

  
  parseState(state?: string): { returnTo: string } {
    if (!state) {
      return { returnTo: '/' };
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(state));
      return { returnTo: parsed?.returnTo || '/' };
    } catch (e) {
      return { returnTo: '/' };
    }
  }
}

export const oauthService = new OAuthService();
