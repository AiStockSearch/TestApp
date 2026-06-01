import {
  appError,
  appLog,
  formatCallLabel,
  formatReturnLabel,
  type LogMode,
} from './logSink';

export type LogPrefixes = {
  call: string;
  return: string;
  error: string;
};

export type WrapWithLoggingOptions = {
  label: string;
  prefixes: LogPrefixes;
  mode: LogMode;
};

export function wrapWithLogging<
  T extends (...args: unknown[]) => unknown,
>(fn: T, options: WrapWithLoggingOptions): T {
  const { label, prefixes, mode } = options;

  return function (
    this: unknown,
    ...args: Parameters<T>
  ): ReturnType<T> {
    appLog(
      mode,
      formatCallLabel(prefixes.call, label),
      args,
    );

    try {
      const result = fn.apply(this, args) as ReturnType<T>;

      appLog(
        mode,
        formatReturnLabel(prefixes.return, label),
        result,
      );

      return result;
    } catch (error) {
      appError(`${prefixes.error} ${label}:`, error);
      throw error;
    }
  } as T;
}
