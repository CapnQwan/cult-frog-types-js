import { describe, it } from 'vitest';

import type { RequireAtLeastOne } from '../index.js';

describe('RequireAtLeastOne', () => {
  interface Payload {
    name?: string;
    email?: string;
    age?: number;
  }

  it('requires at least one key', () => {
    const ok: RequireAtLeastOne<Payload> = { name: 'Ada' };
    // @ts-expect-error an empty object satisfies none of the variants.
    const _bad: RequireAtLeastOne<Payload> = {};
  });

  it('keeps keys outside K required', () => {
    interface Update {
      id: string;
      name?: string;
      email?: string;
    }
    const ok: RequireAtLeastOne<Update, 'name' | 'email'> = { id: 'x', name: 'a' };
    // @ts-expect-error `id` is outside K and must still be provided.
    const _bad: RequireAtLeastOne<Update, 'name' | 'email'> = { name: 'a' };
  });
});
