import { describe, expectTypeOf, it } from 'vitest';

import type { LooseAutocomplete } from '../index.js';

describe('LooseAutocomplete', () => {
  it('accepts known literals and arbitrary strings', () => {
    type Size = LooseAutocomplete<'sm' | 'md' | 'lg'>;
    const a: Size = 'md';
    const b: Size = 'custom';
    expectTypeOf<Size>().toExtend<string>();
  });
});
