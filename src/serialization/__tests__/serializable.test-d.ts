import { describe, expectTypeOf, it } from 'vitest';

import type { Serializable } from '../index.js';

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
