import * as migration_20260715_150820_initial from './20260715_150820_initial';
import * as migration_20260715_210531_nav_globals from './20260715_210531_nav_globals';

export const migrations = [
  {
    up: migration_20260715_150820_initial.up,
    down: migration_20260715_150820_initial.down,
    name: '20260715_150820_initial',
  },
  {
    up: migration_20260715_210531_nav_globals.up,
    down: migration_20260715_210531_nav_globals.down,
    name: '20260715_210531_nav_globals'
  },
];
