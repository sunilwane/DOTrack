import { STORAGE_KEYS } from '../constants';

class TokenStorage {
  get(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  set(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}

export const tokenStorage = new TokenStorage();
