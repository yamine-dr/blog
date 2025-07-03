import { defineRouting } from 'next-intl/routing';
import { locales } from './locales';

export const routing = defineRouting({
  // The list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: locales[0] // "en" -> english
});