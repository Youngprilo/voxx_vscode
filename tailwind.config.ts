import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', 'node_modules/preline/dist/*.js'],

	theme: {
		extend: {}
	},
	plugins: [require('preline/plugin')]
} satisfies Config;
