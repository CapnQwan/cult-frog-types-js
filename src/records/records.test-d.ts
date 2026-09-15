import { describe, expectTypeOf, it } from 'vitest';

import type {
  Entries,
  KeysOfType,
  LooseAutocomplete,
  OmitStrict,
  OptionalKeys,
  RequireAtLeastOne,
  RequiredKeys,
  SetOptional,
  SetRequired,
  Simplify,
  ValueOf,
} from './index.js';

interface User {
  id: string;
  name?: string;
  email?: string;
}

describe('ValueOf', () => {
  it('unions the value types', () => {
    const Roles = { admin: 'ADMIN', user: 'USER' } as const;
    expectTypeOf<ValueOf<typeof Roles>>().toEqualTypeOf<'ADMIN' | 'USER'>();
  });
});

describe('Entries', () => {
  it('preserves the key/value pairing', () => {
    expectTypeOf<Entries<{ id: number; name: string }>>().toEqualTypeOf<
      (['id', number] | ['name', string])[]
    >();
  });

  it('stringifies numeric keys to match Object.entries at runtime', () => {
    expectTypeOf<Entries<{ 1: string }>>().toEqualTypeOf<['1', string][]>();
  });
});

describe('KeysOfType', () => {
  it('selects keys by value type', () => {
    interface M {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }
    expectTypeOf<KeysOfType<M, string>>().toEqualTypeOf<'name' | 'email'>();
  });

  it('excludes union-valued keys that are not wholly assignable', () => {
    expectTypeOf<KeysOfType<{ a: string | number; b: string }, string>>().toEqualTypeOf<'b'>();
  });
});

describe('LooseAutocomplete', () => {
  it('accepts known literals and arbitrary strings', () => {
    type Size = LooseAutocomplete<'sm' | 'md' | 'lg'>;
    const a: Size = 'md';
    const b: Size = 'custom';
    expectTypeOf<Size>().toExtend<string>();
  });
});

describe('OmitStrict', () => {
  it('removes a real key and rejects a typo', () => {
    expectTypeOf<OmitStrict<User, 'email'>>().toEqualTypeOf<{ id: string; name?: string }>();
    // @ts-expect-error "passwrd" is not a key of User.
    type _Bad = OmitStrict<User, 'passwrd'>;
  });
});

describe('SetOptional', () => {
  it('loosens only the named keys', () => {
    interface Config {
      host: string;
      port: number;
      timeout: number;
    }
    const ok: SetOptional<Config, 'port' | 'timeout'> = { host: 'h' };
    // @ts-expect-error `host` was not loosened and is still required.
    const _bad: SetOptional<Config, 'port' | 'timeout'> = { port: 1 };
  });
});

describe('SetRequired', () => {
  it('tightens only the named keys', () => {
    const ok: SetRequired<User, 'name'> = { id: 'x', name: 'n' };
    // @ts-expect-error `name` is now required.
    const _bad: SetRequired<User, 'name'> = { id: 'x' };
  });

  it('produces a flat object rather than an intersection', () => {
    expectTypeOf<SetRequired<User, 'name'>>().toEqualTypeOf<{
      id: string;
      name: string;
      email?: string;
    }>();
  });
});

describe('OptionalKeys / RequiredKeys', () => {
  it('extracts key names by the ? modifier, not the value type', () => {
    expectTypeOf<OptionalKeys<User>>().toEqualTypeOf<'name' | 'email'>();
    expectTypeOf<RequiredKeys<User>>().toEqualTypeOf<'id'>();
  });

  it('treats an explicitly-undefined-valued key as required', () => {
    interface Explicit {
      a: string | undefined;
      b?: string;
    }
    expectTypeOf<OptionalKeys<Explicit>>().toEqualTypeOf<'b'>();
    expectTypeOf<RequiredKeys<Explicit>>().toEqualTypeOf<'a'>();
  });

  it('partitions keyof T', () => {
    expectTypeOf<OptionalKeys<User> | RequiredKeys<User>>().toEqualTypeOf<keyof User>();
  });
});

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

describe('Simplify', () => {
  it('flattens an intersection into one object literal', () => {
    type Raw = Omit<{ a: 1; b: 2 }, 'b'> & { b: 3 };
    expectTypeOf<Simplify<Raw>>().toEqualTypeOf<{ a: 1; b: 3 }>();
  });

  it('preserves optionality', () => {
    expectTypeOf<Simplify<{ a: string; b?: number }>>().toEqualTypeOf<{
      a: string;
      b?: number;
    }>();
  });
});
