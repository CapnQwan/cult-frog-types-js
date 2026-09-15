/**
 * Allows any `string` while still offering editor autocompletion for the known
 * literal members of `T`.
 *
 * A plain union like `"sm" | "md" | string` collapses to `string`, which means
 * you lose the autocomplete suggestions for the known literals. The
 * `string & {}` trick preserves those suggestions while still accepting
 * arbitrary strings — perfect for props such as sizes, variants, or icon names
 * where you want to guide callers toward the common values without forbidding
 * custom ones.
 *
 * @template T The known literal string values to suggest.
 *
 * @example
 * type Size = LooseAutocomplete<"sm" | "md" | "lg">;
 * const a: Size = "md";     // suggested by autocomplete
 * const b: Size = "custom"; // still allowed
 */
export type LooseAutocomplete<T extends string> = T | (string & {});
