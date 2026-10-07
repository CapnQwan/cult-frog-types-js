import { describe, it } from 'vitest';

import type { SetOptional } from '../index.js';

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
