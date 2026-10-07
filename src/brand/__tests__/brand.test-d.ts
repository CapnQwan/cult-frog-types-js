import { describe, expectTypeOf, it } from 'vitest';

import type { Brand } from '../index.js';

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

describe('Brand', () => {
  it('keeps distinct brands over the same base type apart', () => {
    const id = 'abc' as UserId;
    // @ts-expect-error a UserId is not a PostId despite both being strings.
    const _bad: PostId = id;
    // @ts-expect-error a plain string is not a UserId.
    const _alsoBad: UserId = 'abc';
  });

  it('still behaves as its base type', () => {
    const id = 'abc' as UserId;
    expectTypeOf(id.toUpperCase()).toEqualTypeOf<string>();
    expectTypeOf<UserId>().toExtend<string>();
  });
});
