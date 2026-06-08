/**
 * Application-wide constants
 */

// Pagination
export const DEFAULT_PAGE_SIZE = 8;
export const PAGE_SIZE_OPTIONS = [8, 16, 24, 32] as const;

// API
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRIES = 3;

// UI
export const SIDEBAR_MIN_WIDTH = 200;
export const SIDEBAR_MAX_WIDTH = 600;
export const SIDEBAR_DEFAULT_WIDTH = 320;

export const SKELETON_ANIMATION_DURATION = 2000;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = {
  YAML: ['.yml', '.yaml'],
  JSON: ['.json'],
  TEXT: ['.txt', '.md'],
  CODE: ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_WIDTH: 'sidebar_width',
} as const;

// Debounce/Throttle
export const SEARCH_DEBOUNCE_MS = 300;
export const RESIZE_THROTTLE_MS = 16; // ~60fps

// Date/Time
export const DATE_FORMAT = 'MMM DD, YYYY';
export const DATETIME_FORMAT = 'MMM DD, YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm:ss';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PIPELINE: '/pipeline',
  DEPLOYMENTS: '/deployments',
  MARKETPLACE: '/marketplace',
  BLOCKCHAIN: '/blockchain',
  AUDIT_LOGS: '/audit-logs',
  CONNECT_WALLET: '/connect',
  VERSION_HISTORY: '/version-history',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
