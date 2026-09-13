/**
 * A branded type enforcing invariance between different types.
 * 
 * @example `type UserId = Brand<string, 'UserId'>;`
 */
export type Brand<T, B extends string> = T & { __brand: B };