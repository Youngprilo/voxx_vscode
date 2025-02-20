import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit()]
	// server: {
	// 	port: 5173,
	// 	https: {
	// 		key: fs.readFileSync('/Users/Prince/.certs/dev.360baselogistics.com/private.key'),
	// 		cert: fs.readFileSync('/Users/Prince/.certs/dev.360baselogistics.com/certificate.crt')
	// 	}
	// }
});
