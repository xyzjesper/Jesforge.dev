import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	preview: {
	    allowedHosts: ["xyzjesper.dev", "jesforge.dev", "p4oc4ss80kggw0kkc8840s4c.91.99.141.242.sslip.io"]
	}
});
