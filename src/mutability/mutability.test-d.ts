import { describe, expectTypeOf, it } from 'vitest';

import type { DeepImmutable, DeepMutable, Immutable, Mutable } from './index.js';

interface State {
  user: { name: string; roles: string[] };
  fn: (a: number) => string;
}

describe('Immutable', () => {
  it('freezes the top level only', () => {
    const s: Immutable<State> = { user: { name: 'a', roles: [] }, fn: () => '' };
    // @ts-expect-error top-level property is readonly.
    s.user = { name: 'b', roles: [] };
    s.user.name = 'b'; // nested stays writable — this type is shallow by design
  });
});

describe('DeepImmutable', () => {
  it('freezes nested objects and arrays', () => {
    const s: DeepImmutable<State> = { user: { name: 'a', roles: [] }, fn: () => '' };
    // @ts-expect-error nested property is readonly.
    s.user.name = 'b';
    expectTypeOf<DeepImmutable<{ xs: string[] }>['xs']>().toEqualTypeOf<readonly string[]>();
  });

  it('preserves function call signatures', () => {
    const s: DeepImmutable<State> = { user: { name: 'a', roles: [] }, fn: () => '' };
    expectTypeOf(s.fn(1)).toEqualTypeOf<string>();
    expectTypeOf<DeepImmutable<State>['fn']>().toEqualTypeOf<(a: number) => string>();
  });

  it('passes primitives through untouched', () => {
    expectTypeOf<DeepImmutable<string>>().toEqualTypeOf<string>();
    expectTypeOf<DeepImmutable<number>>().toEqualTypeOf<number>();
  });
});

describe('Mutable', () => {
  it('unfreezes the top level', () => {
    const frozen = { a: 1, b: 2 } as const;
    const draft: Mutable<typeof frozen> = { a: 1, b: 2 };
    draft.a = 1;
    expectTypeOf<Mutable<Readonly<{ a: number }>>>().toEqualTypeOf<{ a: number }>();
  });
});

describe('DeepMutable', () => {
  it('unfreezes nested structures and round-trips with DeepImmutable', () => {
    const draft: DeepMutable<DeepImmutable<{ a: { b: number } }>> = { a: { b: 1 } };
    draft.a.b = 2;
    expectTypeOf<DeepMutable<DeepImmutable<{ a: { b: number } }>>>().toEqualTypeOf<{
      a: { b: number };
    }>();
  });

  it('preserves function call signatures', () => {
    expectTypeOf<DeepMutable<State>['fn']>().toEqualTypeOf<(a: number) => string>();
  });
});
