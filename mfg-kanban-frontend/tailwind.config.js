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
					primary: '#8476d3',
					secondary: '#4efc74',
					accent: '#1723d1',
					neutral: '#1e1c26',
					'base-100': '#fbf8fc',
					info: '#5a8ae2',
					success: '#186839',
					warning: '#fdbd5e',
					error: '#f4736c'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('daisyui')]
};
