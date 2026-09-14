/**
 * A zero-argument function that tears down a subscription or side effect.
 *
 * Returning an `Unsubscribe` from a `subscribe`/`on`/`effect` call is a widely
 * used convention (React effects, event emitters, stores) that keeps cleanup
 * co-located with setup: the caller simply invokes the returned function to stop
 * listening and release resources.
 *
 * @example
 * function subscribe(listener: Listener<number>): Unsubscribe {
 *   const id = setInterval(() => listener(Date.now()), 1000);
 *   return () => clearInterval(id);
 * }
 *
 * const stop = subscribe(console.log);
 * stop(); // cleanup
 */
export type Unsubscribe = () => void;
