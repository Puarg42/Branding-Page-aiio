import * as migration_20260715_150820_initial from './20260715_150820_initial';

export const migrations = [
  {
    up: migration_20260715_150820_initial.up,
    down: migration_20260715_150820_initial.down,
    name: '20260715_150820_initial'
  },
];
