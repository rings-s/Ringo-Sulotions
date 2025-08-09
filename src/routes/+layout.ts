import { browser } from '$app/environment';
import { loadTranslations } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    let lang = 'en';
    if (browser) {
        try {
            lang = window.navigator.language?.split('-')[0] || 'en';
            // Only use supported languages
            if (!['en', 'ar'].includes(lang)) {
                lang = 'en';
            }
        } catch (e) {
            lang = 'en';
        }
    }

    try {
        await loadTranslations(lang);
    } catch (e) {
        console.warn('Failed to load translations, falling back to en');
        await loadTranslations('en');
        lang = 'en';
    }

    return { lang };
};

export const prerender = true;
export const ssr = false;
