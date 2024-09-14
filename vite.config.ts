import path from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { version } from './package.json';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import handlebars from 'vite-plugin-handlebars';

import removeConsole from 'vite-plugin-remove-console';
import { HtmlConfig, ReactConfig, BannerMessage, RenderChunks, helpers } from './vite.ext';

const ConsolePlugin = removeConsole();
const ReactPlugin = react(ReactConfig);
const HtmlPlugin = handlebars(HtmlConfig);
const BannerPlugin = banner(BannerMessage);
const CheckerPlugin = checker({ typescript: true });

const rollupOptions = {
	output: {
		manualChunks: {
			vendor: ['react', 'react-router-dom', 'react-dom'],
			...RenderChunks(helpers.dependencies),
		},
	},
};

export default defineConfig({
	optimizeDeps: { esbuildOptions: { target: 'es2020' } },
	esbuild: { logOverride: { 'this-is-undefined-in-esm': 'silent' } },
	plugins: [HtmlPlugin, ReactPlugin, ConsolePlugin, CheckerPlugin, BannerPlugin],
	resolve: { alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }] },
	build: { sourcemap: false, emptyOutDir: true, manifest: true, minify: true, rollupOptions },
	define: {
		__VERSION__: JSON.stringify(version),
		__COMMIT_HASH__: JSON.stringify(helpers.commitHash),
		__IS_PAGES__: JSON.stringify(helpers.isCloudflare),
		__PAGES_HASH: JSON.stringify(process.env.CF_PAGES_COMMIT_SHA),
	},
});
