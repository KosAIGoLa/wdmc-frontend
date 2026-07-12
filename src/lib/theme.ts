import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'wdmc-theme';

function readStored(): Theme | null {
	if (!browser) return null;
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		if (v === 'light' || v === 'dark') return v;
	} catch {
		/* ignore */
	}
	return null;
}

function systemPrefersDark(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveInitial(): Theme {
	return readStored() ?? (systemPrefersDark() ? 'dark' : 'light');
}

function applyTheme(theme: Theme) {
	if (!browser) return;
	const root = document.documentElement;
	root.classList.toggle('dark', theme === 'dark');
	root.dataset.theme = theme;
	root.style.colorScheme = theme;
}

function createThemeStore() {
	const initial = browser ? resolveInitial() : ('light' as Theme);
	const { subscribe, set, update } = writable<Theme>(initial);

	if (browser) {
		applyTheme(initial);
	}

	return {
		subscribe,
		set(theme: Theme) {
			applyTheme(theme);
			if (browser) {
				try {
					localStorage.setItem(STORAGE_KEY, theme);
				} catch {
					/* ignore */
				}
			}
			set(theme);
		},
		toggle() {
			update((current) => {
				const next: Theme = current === 'dark' ? 'light' : 'dark';
				applyTheme(next);
				if (browser) {
					try {
						localStorage.setItem(STORAGE_KEY, next);
					} catch {
						/* ignore */
					}
				}
				return next;
			});
		},
		/** Re-apply from storage (e.g. after hydration). */
		init() {
			const theme = resolveInitial();
			applyTheme(theme);
			set(theme);
		}
	};
}

export const theme = createThemeStore();
