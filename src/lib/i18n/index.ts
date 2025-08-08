import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./en.json'));
register('ar', () => import('./ar.json'));

export const loadTranslations = async (locale: string) => {
    await init({
        fallbackLocale: 'en',
        initialLocale: locale || getLocaleFromNavigator() || 'en',
    });
};
