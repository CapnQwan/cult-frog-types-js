/**
 * A callback that receives a single `payload` and returns nothing.
 *
 * The canonical shape for an event handler or subscriber in an observer /
 * pub-sub pattern. Pairing it with {@link Unsubscribe} gives you a tidy,
 * consistent contract for `on(event, listener)`-style APIs.
 *
 * @template T The type of the value delivered to the listener.
 *
 * @example
 * const onMessage: Listener<string> = (msg) => console.log(msg);
 *
 * function subscribe<T>(listener: Listener<T>): Unsubscribe {
 *   // register listener...
 *   return () => {};
 * }
 */
export type Listener<T> = (payload: T) => void;
