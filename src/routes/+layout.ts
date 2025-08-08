import { browser } from '$app/environment';
import { loadTranslations } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
    let lang = 'en';
    if (browser) {
        lang = window.navigator.language || 'en';
    }

    await loadTranslations(lang);

    return { lang };
};
