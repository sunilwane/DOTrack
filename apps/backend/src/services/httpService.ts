export class ExternalApiError extends Error {
  public readonly status: number;
  public readonly details: unknown;

  constructor(message: string, status: number, details: unknown = null) {
    super(message);
    this.name = 'ExternalApiError';
    this.status = status;
    this.details = details;
  }
}

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const raw = await response.text();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export const requestJson = async <T>(
  url: string,
  init: RequestInit,
  errorMessage: string
): Promise<T> => {
  const response = await fetch(url, init);
  const body = await parseResponseBody(response);

  if (!response.ok) {
    throw new ExternalApiError(
      `${errorMessage}: ${response.status} ${response.statusText}`,
      response.status,
      body
    );
  }

  return body as T;
};

export const requestJsonOrNull = async <T>(
  url: string,
  init: RequestInit
): Promise<T | null> => {
  const response = await fetch(url, init);
  if (!response.ok) return null;

  const body = await parseResponseBody(response);
  return body as T;
};
