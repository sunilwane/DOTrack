import { logger } from './logger';

/**
 * Error handling utilities for consistent error management across the application.
 */

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode?: number;
  response?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  field?: string;

  constructor(
    message: string,
    field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Extract a user-friendly error message from an error object
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return error.field ? `${error.field}: ${error.message}` : error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Handle errors consistently with logging
 */
export function handleError(
  error: unknown,
  context?: string,
  additionalContext?: Record<string, unknown>
): string {
  const message = getErrorMessage(error);
  const logContext = {
    ...(additionalContext || {}),
    context: context || 'Unknown context',
  };

  if (error instanceof Error) {
    logger.error(message, error, logContext);
  } else {
    logger.error(message, undefined, logContext);
  }

  return message;
}

/**
 * Wrap async functions with error handling
 */
export function withErrorHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context: string
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const message = handleError(error, context);
      throw new Error(message);
    }
  }) as T;
}

/**
 * Assert that a condition is true, throw ValidationError if not
 */
export function assert(
  condition: boolean,
  message: string,
  field?: string
): asserts condition {
  if (!condition) {
    throw new ValidationError(message, field);
  }
}
