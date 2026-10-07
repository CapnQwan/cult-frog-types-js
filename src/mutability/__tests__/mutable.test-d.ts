import { describe, expectTypeOf, it } from 'vitest';

import type { DeepImmutable, DeepMutable, Mutable } from '../index.js';

interface State {
  user: { name: string; roles: string[] };
  fn: (a: number) => string;
}

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
