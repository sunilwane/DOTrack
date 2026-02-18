const trimTrailingSlash = (value: string): string => value.trim().replace(/\/+$/, '');

export const normalizeOrigin = (value: string): string => {
  const trimmed = trimTrailingSlash(value);
  if (!trimmed) return '';

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed;
  }
};

export const parseAllowedOrigins = (
  value: string | undefined,
  fallbackOrigin: string
): string[] => {
  const fallback = normalizeOrigin(fallbackOrigin);
  const candidates = (value || '')
    .split(',')
    .map((entry) => normalizeOrigin(entry))
    .filter(Boolean);

  if (candidates.length === 0) {
    return [fallback];
  }

  return Array.from(new Set(candidates));
};

export const normalizeFrontendBaseUrl = (
  value: string | undefined,
  fallbackOrigin: string
): string => {
  const normalized = normalizeOrigin(value || '');
  if (normalized) return normalized;
  return normalizeOrigin(fallbackOrigin);
};

export const normalizeReturnToPath = (value: string | undefined): string => {
  if (!value || !value.startsWith('/')) {
    return '/';
  }

  return value;
};
