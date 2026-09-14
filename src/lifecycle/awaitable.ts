/**
 * A value that may be either synchronous (`T`) or asynchronous (a promise of
 * `T`).
 *
 * Ideal for APIs that let callers supply either a plain value or a promise —
 * such as hooks, factories, or middleware where an implementation might resolve
 * immediately or after I/O. Consumers can normalise the value simply by
 * `await`-ing it, since `await` accepts both forms.
 *
 * @template T The resolved value type.
 *
 * @example
 * type Loader<T> = () => Awaitable<T>;
 *
 * async function run<T>(load: Loader<T>): Promise<T> {
 *   return await load(); // works whether load is sync or async
 * }
 */
export type Awaitable<T> = T | PromiseLike<T>;
