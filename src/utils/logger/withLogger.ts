import { wrapWithLogging } from './core/wrapWithLogging';

export function withLogger<
  T extends (...args: unknown[]) => unknown,
>(fn: T, functionName: string): T {
  return wrapWithLogging(fn, {
    label: functionName,
    mode: 'devOnly',
    prefixes: {
      call: '[HOOK CALL]',
      return: '[HOOK RETURN]',
      error: '[HOOK ERROR] в функции',
    },
  });
}
