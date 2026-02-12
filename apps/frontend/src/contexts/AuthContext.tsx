import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { SignInData, SignUpData } from '../services/authService';

interface User {
  sub: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signin: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getAccessToken();

      if (token) {
        try {
          const { user: userData } = await authService.getMe();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          try {
            await authService.refresh();
            const { user: userData } = await authService.getMe();
            setUser(userData);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            localStorage.removeItem('accessToken');
            setUser(null);
          }
        }
      } else {
        try {
          await authService.refresh();
          const { user: userData } = await authService.getMe();
          setUser(userData);
        } catch (err) {
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = async (data: SignInData) => {
    try {
      await authService.signin(data);
      const { user: userData } = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signup = async (data: SignUpData) => {
    try {
      await authService.signup(data);
      const { user: userData } = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signout = async () => {
    try {
      await authService.signout();
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshAuth = async () => {
    try {
      await authService.refresh();
      const { user: userData } = await authService.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Refresh error:', error);
      setUser(null);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signin,
    signup,
    signout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
