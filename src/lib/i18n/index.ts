import { browser } from '$app/environment';
import { derived, writable, type Readable } from 'svelte/store';
import type zhTW from './zh-TW';
import type { Content } from '$lib/content';
import { loadContent } from '$lib/content';

export type Locale = 'zh-TW' | 'en';

function getBrowserLocale(): Locale {
	if (!browser) return 'zh-TW';
	const lang = navigator.language.toLowerCase();
	return lang.startsWith('zh') ? 'zh-TW' : 'en';
}

export const locale = writable<Locale>(getBrowserLocale());

async function loadDictionary(next: Locale): Promise<typeof zhTW> {
	const module = next === 'zh-TW' ? await import('./zh-TW') : await import('./en');
	return module.default;
}

export const dictionary = derived<Readable<Locale>, typeof zhTW | undefined>(
	locale,
	($locale, set) => {
		loadDictionary($locale).then(set);
	},
	undefined
);

/** Page/content copy extracted from data (home, about, news, …). */
export const content = derived<Readable<Locale>, Content | undefined>(
	locale,
	($locale, set) => {
		loadContent($locale).then(set);
	},
	undefined
);

function getValue(dict: unknown, key: string): unknown {
	if (!dict) return undefined;
	return key.split('.').reduce((obj: unknown, k) => {
		if (obj && typeof obj === 'object' && k in obj) {
			return (obj as Record<string, unknown>)[k];
		}
		return undefined;
	}, dict);
}

export const t: Readable<(key: string) => string> = derived(dictionary, ($dict) => {
	return (key: string) => (getValue($dict, key) ?? key) as string;
});

/** Typed helper for nested dictionary values (arrays/objects). */
export const tAny: Readable<(key: string) => unknown> = derived(dictionary, ($dict) => {
	return (key: string) => getValue($dict, key);
});

export function setLocale(next: Locale) {
	locale.set(next);
}
