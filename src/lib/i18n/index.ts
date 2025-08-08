import { register } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./en.json'));
register('ar', () => import('./ar.json'));

