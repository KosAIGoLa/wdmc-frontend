import type zh from './zh-TW';

export type Content = typeof zh;

export async function loadContent(locale: 'zh-TW' | 'en'): Promise<Content> {
	const mod = locale === 'zh-TW' ? await import('./zh-TW') : await import('./en');
	return mod.default as unknown as Content;
}
