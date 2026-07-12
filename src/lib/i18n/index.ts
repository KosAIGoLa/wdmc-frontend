import { browser } from '$app/environment';
import { derived, writable, type Readable } from 'svelte/store';
import type zhTW from './zh-TW';
import type { Content } from '$lib/content';

// Eager default locale — avoids empty first paint / raw keys on refresh
import defaultDict from './zh-TW';
import defaultContent from '$lib/content/zh-TW';

export type Locale = 'zh-TW' | 'en';

const STORAGE_KEY = 'wdmc-locale';

function readStoredLocale(): Locale | null {
	if (!browser) return null;
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === 'zh-TW' || v === 'en') return v;
	} catch {
		/* ignore */
	}
	return null;
}

function detectLocale(): Locale {
	if (!browser) return 'zh-TW';
	const stored = readStoredLocale();
	if (stored) return stored;
	const lang = navigator.language.toLowerCase();
	return lang.startsWith('zh') ? 'zh-TW' : 'en';
}

export const locale = writable<Locale>(detectLocale());

export const dictionary = writable<typeof zhTW>(defaultDict);
export const content = writable<Content>(defaultContent as unknown as Content);

/**
 * False only while a non-default (or switched) locale bundle is loading.
 * Default zh-TW is always available synchronously → no flash of keys.
 */
export const i18nReady = writable(true);

let loadSeq = 0;

async function loadLocaleBundle(next: Locale): Promise<{
	dict: typeof zhTW;
	content: Content;
}> {
	if (next === 'zh-TW') {
		const [dictMod, contentMod] = await Promise.all([
			import('./zh-TW'),
			import('$lib/content/zh-TW')
		]);
		return {
			dict: dictMod.default,
			content: contentMod.default as unknown as Content
		};
	}
	const [dictMod, contentMod] = await Promise.all([
		import('./en'),
		import('$lib/content/en')
	]);
	return {
		dict: dictMod.default as typeof zhTW,
		content: contentMod.default as unknown as Content
	};
}

async function applyLocale(next: Locale, opts?: { persist?: boolean }) {
	const seq = ++loadSeq;

	// zh-TW is already in the bundle; apply immediately for zero-flash
	if (next === 'zh-TW') {
		dictionary.set(defaultDict);
		content.set(defaultContent as unknown as Content);
		i18nReady.set(true);
		if (opts?.persist !== false && browser) {
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				/* ignore */
			}
		}
		return;
	}

	i18nReady.set(false);
	try {
		const bundle = await loadLocaleBundle(next);
		if (seq !== loadSeq) return; // superseded
		dictionary.set(bundle.dict);
		content.set(bundle.content);
		i18nReady.set(true);
		if (opts?.persist !== false && browser) {
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				/* ignore */
			}
		}
	} catch (err) {
		console.error('[i18n] failed to load locale', next, err);
		// Fall back to zh so the UI is never stuck on a blank screen
		if (seq !== loadSeq) return;
		dictionary.set(defaultDict);
		content.set(defaultContent as unknown as Content);
		i18nReady.set(true);
	}
}

// Browser: if detected locale is English, load it before revealing full UI
if (browser) {
	const initial = detectLocale();
	if (initial !== 'zh-TW') {
		// Keep ready=false until EN packs land (prevents zh→en flash of wrong language)
		i18nReady.set(false);
		locale.set(initial);
		void applyLocale(initial, { persist: false });
	}
}

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
	void applyLocale(next);
}

/** Await current locale packs (useful for splash / tests). */
export function whenI18nReady(): Promise<void> {
	return new Promise((resolve) => {
		const unsub = i18nReady.subscribe((ready) => {
			if (ready) {
				// Defer unsub to avoid store re-entrancy
				queueMicrotask(() => unsub());
				resolve();
			}
		});
	});
}
