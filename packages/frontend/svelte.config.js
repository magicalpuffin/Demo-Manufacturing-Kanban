import adapter from 'svelte-kit-sst';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			'@Demo-Manufacturing-Kanban/core/*': '../core/src/*'
		}
	}
};

export default config;
