import * as migration_20260715_150820_initial from './20260715_150820_initial';
import * as migration_20260715_210531_nav_globals from './20260715_210531_nav_globals';
import * as migration_20260715_212547_pages_collection from './20260715_212547_pages_collection';

export const migrations = [
  {
    up: migration_20260715_150820_initial.up,
    down: migration_20260715_150820_initial.down,
    name: '20260715_150820_initial',
  },
  {
    up: migration_20260715_210531_nav_globals.up,
    down: migration_20260715_210531_nav_globals.down,
    name: '20260715_210531_nav_globals',
  },
  {
    up: migration_20260715_212547_pages_collection.up,
    down: migration_20260715_212547_pages_collection.down,
    name: '20260715_212547_pages_collection'
  },
];
