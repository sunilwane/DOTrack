/**
 * Logger utility for consistent logging across the application.
 * Provides structured logging with different levels and can be extended
 * to send logs to external services in production.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const context = entry.context ? ` | Context: ${JSON.stringify(entry.context)}` : '';
    return `[${timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${context}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };

    // In development, log to console
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage(entry);
      
      switch (level) {
        case 'debug':
          console.log('🔍', formattedMessage, error || '');
          break;
        case 'info':
          console.info('ℹ️', formattedMessage);
          break;
        case 'warn':
          console.warn('⚠️', formattedMessage, error || '');
          break;
        case 'error':
          console.error('❌', formattedMessage, error || '');
          break;
      }
    }

    // TODO: In production, send logs to external service (e.g., Sentry, LogRocket)
    // if (!this.isDevelopment && level === 'error') {
    //   this.sendToExternalService(entry);
    // }
  }

  /**
   * Log debug information (development only)
   */
  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  /**
   * Log informational messages
   */
  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: Record<string, unknown>, error?: Error) {
    this.log('warn', message, context, error);
  }

  /**
   * Log error messages
   */
  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log('error', message, context, error);
  }
}

export const logger = new Logger();
