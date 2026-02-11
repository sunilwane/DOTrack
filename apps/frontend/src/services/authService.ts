const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async signup(data: SignUpData): Promise<{ id: string; email: string; name: string }> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Signup failed' }));
      throw new Error(error.error || 'Signup failed');
    }

    return response.json();
  }

  async signin(data: SignInData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Invalid credentials' }));
      throw new Error(error.error || 'Invalid credentials');
    }

    const result = await response.json();
    
    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result;
  }

  async signout(): Promise<void> {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      localStorage.removeItem('accessToken');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        console.warn('Signout request failed, but clearing local data');
      }
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
    }
  }

  async refresh(): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Refresh token expired');
    }

    const result = await response.json();
    
    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result;
  }

  async getMe(): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();
