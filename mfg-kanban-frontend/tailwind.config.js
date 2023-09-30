/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ef9d70',
					secondary: '#53d6b5',
					accent: '#343aed',
					neutral: '#2a2b37',
					'base-100': '#ffffff',
					info: '#5382d5',
					success: '#135832',
					warning: '#d49b16',
					error: '#ef4444'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('daisyui')]
};
