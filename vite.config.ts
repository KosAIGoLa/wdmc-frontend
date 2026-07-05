import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { minify } from 'html-minifier-terser';
import fs from 'node:fs/promises';
import path from 'node:path';

async function findHtmlFiles(dir: string): Promise<string[]> {
	const files: string[] = [];
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await findHtmlFiles(fullPath)));
		} else if (entry.name.endsWith('.html')) {
			files.push(fullPath);
		}
	}
	return files;
}

function minifyHtmlPlugin(outDir: string = 'build') {
	const resolvedOutDir = path.resolve(outDir);
	return {
		name: 'minify-html',
		apply: 'build' as const,
		async closeBundle() {
			const files = await findHtmlFiles(resolvedOutDir);
			await Promise.all(
				files.map(async (file) => {
					const html = await fs.readFile(file, 'utf-8');
					const minified = await minify(html, {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true,
						minifyCSS: true,
						minifyJS: true
					});
					await fs.writeFile(file, minified);
				})
			);
		}
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			paths: {
				base: process.env.BASE_PATH || ''
			}
		}),
		minifyHtmlPlugin()
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
