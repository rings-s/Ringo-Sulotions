import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			split: false,
			edge: false
		}),
		prerender: {
			handleMissingId: 'ignore',
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404 errors for favicon
				if (path === '/favicon.png') {
					return;
				}
				// Throw error for other cases
				throw new Error(message);
			},
			entries: ['*']
		}
	}
};

export default config;
