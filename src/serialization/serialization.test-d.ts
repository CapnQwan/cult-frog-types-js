import { describe, expectTypeOf, it } from 'vitest';

import type { Json, JsonArray, JsonObject, JsonPrimitive, Serializable } from './index.js';

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

describe('Serializable', () => {
  it('passes JSON-shaped types through, including interfaces', () => {
    interface UserI {
      id: number;
      tags: string[];
    }
    expectTypeOf<Serializable<UserI>>().toEqualTypeOf<{ id: number; tags: string[] }>();
    expectTypeOf<Serializable<{ id: number }>>().toEqualTypeOf<{ id: number }>();
  });

  it('applies toJSON', () => {
    expectTypeOf<Serializable<Date>>().toEqualTypeOf<string>();
  });

  it('recurses into nested values', () => {
    interface Post {
      id: number;
      createdAt: Date;
      author: { name: string; joined: Date };
    }
    expectTypeOf<Serializable<Post>>().toEqualTypeOf<{
      id: number;
      createdAt: string;
      author: { name: string; joined: string };
    }>();
  });

  it('drops non-serializable object keys rather than failing the whole type', () => {
    expectTypeOf<Serializable<{ a: 1; fn: () => void }>>().toEqualTypeOf<{ a: 1 }>();
  });

  it('resolves to never only when nothing survives at the top level', () => {
    expectTypeOf<Serializable<() => void>>().toEqualTypeOf<never>();
  });

  it('maps unserializable array slots to null, as JSON.stringify does', () => {
    expectTypeOf<Serializable<[number, () => void]>>().toEqualTypeOf<[number, null]>();
  });
});
