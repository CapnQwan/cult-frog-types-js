import { describe, expectTypeOf, it } from 'vitest';

import type { TaggedUnion } from './index.js';

type Result =
  | TaggedUnion<'success', { value: number }>
  | TaggedUnion<'failure', { error: Error }>
  | TaggedUnion<'loading'>;

describe('TaggedUnion', () => {
  it('narrows on the discriminant', () => {
    function handle(r: Result): number | null {
      switch (r.type) {
        case 'success':
          return r.payload.value;
        case 'failure':
          throw r.payload.error;
        case 'loading':
          return null;
      }
    }
    expectTypeOf(handle).returns.toEqualTypeOf<number | null>();
  });

  it('omits payload entirely for a payload-less variant', () => {
    expectTypeOf<TaggedUnion<'loading'>>().toEqualTypeOf<{ readonly type: 'loading' }>();
    const ok: TaggedUnion<'loading'> = { type: 'loading' };
    // @ts-expect-error the payload-less variant has no payload property.
    const _bad: TaggedUnion<'loading'> = { type: 'loading', payload: 1 };
  });

  it('does not distribute over a union payload', () => {
    expectTypeOf<TaggedUnion<'change', { a: 1 } | { b: 2 }>>().toEqualTypeOf<{
      readonly type: 'change';
      readonly payload: { a: 1 } | { b: 2 };
    }>();
  });

  it('does not collapse to never for a never payload', () => {
    // `never` is assignable to `undefined`, so this lands on the payload-less
    // branch. The point is that the variant survives at all: the old naked
    // `P extends undefined` distributed over `never` and erased the member.
    expectTypeOf<TaggedUnion<'x', never>>().toEqualTypeOf<{ readonly type: 'x' }>();
  });

  it('supports a custom discriminant key', () => {
    expectTypeOf<TaggedUnion<'reset', undefined, 'kind'>>().toEqualTypeOf<{
      readonly kind: 'reset';
    }>();
    const action: TaggedUnion<'add', { n: number }, 'kind'> = { kind: 'add', payload: { n: 1 } };
    expectTypeOf(action.kind).toEqualTypeOf<'add'>();
  });
});
