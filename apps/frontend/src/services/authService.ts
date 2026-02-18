import { apiRequest } from './apiClient';
import { apiPaths } from './apiPaths';
import { tokenStorage } from './tokenStorage';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface UserResponse {
  user: {
    sub: string;
    email: string;
    iat?: number;
    exp?: number;
  };
}

class AuthService {
  async signup(data: SignUpData): Promise<{ id: string; email: string; name: string }> {
    return apiRequest<{ id: string; email: string; name: string }>(apiPaths.auth.signup, {
      method: 'POST',
      body: data,
    });
  }

  async signin(data: SignInData): Promise<AuthResponse> {
    const result = await apiRequest<AuthResponse>(apiPaths.auth.signin, {
      method: 'POST',
      body: data,
    });

    if (result.accessToken) {
      tokenStorage.set(result.accessToken);
    }

    return result;
  }

  async signout(): Promise<void> {
    const token = tokenStorage.get();

    if (!token) {
      tokenStorage.clear();
      return;
    }

    try {
      await apiRequest<{ ok: boolean }>(apiPaths.auth.signout, {
        method: 'POST',
        auth: true,
      });
    } catch (error) {
      console.warn('Signout request failed, but clearing local data', error);
    } finally {
      tokenStorage.clear();
    }
  }

  async refresh(): Promise<AuthResponse> {
    const result = await apiRequest<AuthResponse>(apiPaths.auth.refresh, {
      method: 'POST',
    });

    if (result.accessToken) {
      tokenStorage.set(result.accessToken);
    }

    return result;
  }

  async getMe(): Promise<UserResponse> {
    return apiRequest<UserResponse>(apiPaths.auth.me, {
      method: 'GET',
      auth: true,
    });
  }

  getAccessToken(): string | null {
    return tokenStorage.get();
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();
