import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SignInData, SignUpData } from '../services/authService';
import { logger } from '../utils/logger';
import {
  initializeAuthUser,
  refreshAndFetchCurrentUser,
  signinAndFetchCurrentUser,
  signoutUser,
  signupUser,
} from './auth/authOperations';
import type { AuthContextType, AuthProviderProps } from './auth/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/*eslint-disable-next-line react-refresh/only-export-components */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const initializedUser = await initializeAuthUser();
      setUser(initializedUser);

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const signin = async (data: SignInData) => {
    try {
      const userData = await signinAndFetchCurrentUser(data);
      setUser(userData);
      logger.info('User signed in successfully', { email: data.email });
    } catch (error) {
      logger.error('Signin failed', error instanceof Error ? error : undefined, { email: data.email });
      throw error;
    }
  };

  const signup = async (data: SignUpData) => {
    try {
      await signupUser(data);
      logger.info('User signed up successfully', { email: data.email });
    } catch (error) {
      logger.error('Signup failed', error instanceof Error ? error : undefined, { email: data.email });
      throw error;
    }
  };

  const signout = async () => {
    try {
      await signoutUser();
      logger.info('User signed out successfully');
    } catch (error) {
      logger.error('Signout failed', error instanceof Error ? error : undefined);
    } finally {
      setUser(null);
    }
  };

  const refreshAuth = async () => {
    try {
      const userData = await refreshAndFetchCurrentUser();
      setUser(userData);
      logger.debug('Auth token refreshed successfully');
    } catch (error) {
      logger.error('Auth refresh failed', error instanceof Error ? error : undefined);
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
