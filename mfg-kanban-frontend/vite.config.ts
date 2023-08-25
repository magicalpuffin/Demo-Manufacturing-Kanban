import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5173,
		watch: {
			usePolling: true
		},
		hmr: {
			port: 24678
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
