import { authService } from '../../services/authService';
import { tokenStorage } from '../../services/tokenStorage';
import type { SignInData, SignUpData } from '../../services/authService';
import type { User } from './types';

const fetchCurrentUser = async (): Promise<User> => {
  const { user } = await authService.getMe();
  return user;
};

export const refreshAndFetchCurrentUser = async (): Promise<User> => {
  await authService.refresh();
  return fetchCurrentUser();
};

export const initializeAuthUser = async (): Promise<User | null> => {
  const token = authService.getAccessToken();

  if (token) {
    try {
      return await fetchCurrentUser();
    } catch (error) {
      console.error('Failed to fetch user:', error);
      try {
        return await refreshAndFetchCurrentUser();
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        tokenStorage.clear();
        return null;
      }
    }
  }

  try {
    return await refreshAndFetchCurrentUser();
  } catch {
    return null;
  }
};

export const signinAndFetchCurrentUser = async (data: SignInData): Promise<User> => {
  await authService.signin(data);
  return fetchCurrentUser();
};

export const signupUser = async (data: SignUpData) => {
  await authService.signup(data);
};

export const signoutUser = async () => {
  await authService.signout();
};
