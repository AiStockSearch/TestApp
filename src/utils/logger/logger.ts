import { wrapWithLogging } from './core/wrapWithLogging';

export function logger(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value as (
    ...args: unknown[]
  ) => unknown;

  descriptor.value = wrapWithLogging(originalMethod, {
    label: propertyKey,
    mode: 'always',
    prefixes: {
      call: '[CALL]',
      return: '[RETURN]',
      error: '[ERROR] в методе',
    },
  });

  return descriptor;
}
