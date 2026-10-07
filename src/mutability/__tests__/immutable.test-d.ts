import { describe, expectTypeOf, it } from 'vitest';

import type { DeepImmutable, Immutable } from '../index.js';

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
