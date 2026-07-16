import * as migration_20260715_150820_initial from './20260715_150820_initial';
import * as migration_20260715_210531_nav_globals from './20260715_210531_nav_globals';
import * as migration_20260715_212547_pages_collection from './20260715_212547_pages_collection';
import * as migration_20260716_062043_publication_body_html from './20260716_062043_publication_body_html';
import * as migration_20260716_062610_publication_presentation from './20260716_062610_publication_presentation';
import * as migration_20260716_082549_localization_foundation from './20260716_082549_localization_foundation';
import * as migration_20260716_083659_cms_page_modules from './20260716_083659_cms_page_modules';
import * as migration_20260716_091856_admin_titles from './20260716_091856_admin_titles';
import * as migration_20260716_151334_cms_authority_themes from './20260716_151334_cms_authority_themes';
import * as migration_20260716_152625_remove_generic_module from './20260716_152625_remove_generic_module';

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
    name: '20260715_212547_pages_collection',
  },
  {
    up: migration_20260716_062043_publication_body_html.up,
    down: migration_20260716_062043_publication_body_html.down,
    name: '20260716_062043_publication_body_html',
  },
  {
    up: migration_20260716_062610_publication_presentation.up,
    down: migration_20260716_062610_publication_presentation.down,
    name: '20260716_062610_publication_presentation',
  },
  {
    up: migration_20260716_082549_localization_foundation.up,
    down: migration_20260716_082549_localization_foundation.down,
    name: '20260716_082549_localization_foundation',
  },
  {
    up: migration_20260716_083659_cms_page_modules.up,
    down: migration_20260716_083659_cms_page_modules.down,
    name: '20260716_083659_cms_page_modules',
  },
  {
    up: migration_20260716_091856_admin_titles.up,
    down: migration_20260716_091856_admin_titles.down,
    name: '20260716_091856_admin_titles',
  },
  {
    up: migration_20260716_151334_cms_authority_themes.up,
    down: migration_20260716_151334_cms_authority_themes.down,
    name: '20260716_151334_cms_authority_themes',
  },
  {
    up: migration_20260716_152625_remove_generic_module.up,
    down: migration_20260716_152625_remove_generic_module.down,
    name: '20260716_152625_remove_generic_module'
  },
];
