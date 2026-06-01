/* eslint-disable no-console -- единая точка вывода в console / Reactotron */

export function hasReactotron(): boolean {
  return (
    typeof console !== 'undefined' &&
    console.tron !== undefined
  );
}

export type LogMode = 'always' | 'devOnly';

export function appLog(
  mode: LogMode,
  ...args: unknown[]
): void {
  if (mode === 'devOnly' && !__DEV__) {
    return;
  }

  if (__DEV__ && hasReactotron()) {
    console.tron.log(...args);
    return;
  }

  if (mode === 'always' || __DEV__) {
    console.log(...args);
  }
}

export function appError(
  message: string,
  error: unknown,
): void {
  console.error(message, error);
}

export function formatCallLabel(
  prefix: string,
  label: string,
): string {
  const suffix =
    __DEV__ && hasReactotron() ? ' с аргументами:' : ':';
  return `${prefix} ${label}${suffix}`;
}

export function formatReturnLabel(
  prefix: string,
  label: string,
): string {
  return `${prefix} ${label} ->`;
}
