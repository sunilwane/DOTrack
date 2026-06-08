import type { ReactNode } from 'react';
import type { SignInData, SignUpData } from '../../services/authService';

export interface User {
  sub: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
