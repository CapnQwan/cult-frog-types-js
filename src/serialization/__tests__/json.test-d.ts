import { describe, it } from 'vitest';

import type { Json, JsonArray, JsonObject, JsonPrimitive } from '../index.js';

describe('Json', () => {
  it('accepts the full JSON grammar', () => {
    const payload: Json = { id: 1, tags: ['a', 'b'], meta: { active: true, note: null } };
    // @ts-expect-error functions are not JSON.
    const _bad: Json = { fn: () => {} };
  });

  it('narrows to object, array and primitive forms', () => {
    const o: JsonObject = { a: 1 };
    const a: JsonArray = [{ id: 1 }, 2, null];
    const p: JsonPrimitive = null;
    // @ts-expect-error a bare primitive is not a JsonObject.
    const _bad: JsonObject = 1;
  });
});
