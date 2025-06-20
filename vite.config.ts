import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	preview: {
	   allowedHosts: ["twok8c040cwo840kg4w4gsw4.192.168.1.93.sslip.io", "xyzjesper.dev"]
	}
});
