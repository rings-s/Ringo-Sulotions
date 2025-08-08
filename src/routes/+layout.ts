import { browser } from '$app/environment';
import { loadTranslations } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    let lang = 'en';
    if (browser) {
        try {
            lang = window.navigator.language || 'en';
        } catch (e) {
            lang = 'en';
        }
    }

    await loadTranslations(lang);

    return { lang };
};

export const prerender = true;
export const ssr = true;
