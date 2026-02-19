import { tokenStorage } from './tokenStorage';
import { ApiError } from '../utils/errorHandler';
import { logger } from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
  credentials?: RequestCredentials;
}

interface ApiErrorPayload {
  error?: string;
  message?: string;
}

const extractErrorMessage = async (response: Response): Promise<string> => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = (await response
      .json()
      .catch(() => null)) as ApiErrorPayload | null;
    if (payload?.error) return payload.error;
    if (payload?.message) return payload.message;
  }

  const text = await response.text().catch(() => '');
  return text || `Request failed with status ${response.status}`;
};

export const buildApiUrl = (path: string): string => `${API_BASE_URL}${path}`;

export const apiRequest = async <T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const headers = new Headers(options.headers);

  if (options.auth) {
    const token = tokenStorage.get();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else if (typeof options.body === 'string') {
      body = options.body;
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'text/plain');
      }
    } else {
      body = JSON.stringify(options.body);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }
  }

  const response = await fetch(buildApiUrl(path), {
    method: options.method || 'GET',
    credentials: options.credentials || 'include',
    headers,
    body,
  });

  if (!response.ok) {
    const errorMessage = await extractErrorMessage(response);
    logger.warn('API request failed', { path, status: response.status, message: errorMessage });
    throw new ApiError(errorMessage, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
