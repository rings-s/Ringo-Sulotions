import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import '$lib/i18n';

export const load = async ({ data }) => {
	const lang = data.lang || (browser ? window.navigator.language : 'en');
	
	locale.set(lang);
	await waitLocale(lang);

	return { lang };
};
