<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatSidebar from '$lib/components/FloatSidebar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import ActiveLine from '$lib/components/ActiveLine.svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import BootSplash from '$lib/components/BootSplash.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme';
	import { i18nReady, content, whenI18nReady } from '$lib/i18n';

	let { children } = $props();

	/**
	 * Boot gate (client only — SSR renders full shell for crawlers / no-JS):
	 * 1. app.html #boot-pre spinner covers until mount
	 * 2. BootSplash takes over with brand animation
	 * 3. Wait i18n + fonts + min duration → fade to full page
	 */
	let booting = $state(false);
	let splashExiting = $state(false);
	let entered = $state(true);

	const MIN_SPLASH_MS = 800;

	async function runBootSequence(minMs: number) {
		const started = performance.now();
		const fontsReady =
			typeof document !== 'undefined' && 'fonts' in document
				? document.fonts.ready.catch(() => undefined)
				: Promise.resolve();

		await Promise.all([whenI18nReady(), fontsReady]);

		const waitMore = Math.max(0, minMs - (performance.now() - started));
		if (waitMore > 0) await new Promise((r) => setTimeout(r, waitMore));

		splashExiting = true;
		entered = true;
		await new Promise((r) => setTimeout(r, 480));
		booting = false;
	}

	onMount(() => {
		theme.init();

		// Hand off: HTML pre-spinner → branded BootSplash
		booting = true;
		entered = false;
		splashExiting = false;

		// Next frame so BootSplash is painted, then remove #boot-pre
		requestAnimationFrame(() => {
			const hide = (window as unknown as { __wdmcBootHide?: () => void }).__wdmcBootHide;
			hide?.();
		});

		void runBootSequence(MIN_SPLASH_MS);
	});

	// Locale switch mid-session
	$effect(() => {
		if (!browser) return;
		if (!$i18nReady && !booting) {
			booting = true;
			splashExiting = false;
			entered = false;
			void runBootSequence(480);
		}
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}

	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
			return;
		}

		if (!document.startViewTransition) {
			return navigation.complete.then(scrollToTop);
		}

		return new Promise<void>((resolve) => {
			requestAnimationFrame(() => {
				const transition = document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
					scrollToTop();
				});
				transition.finished.catch(() => {});
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="color-scheme" content={$theme === 'dark' ? 'dark light' : 'light dark'} />
	<meta name="theme-color" content={$theme === 'dark' ? '#12100f' : '#ffffff'} />
</svelte:head>

{#if booting}
	<BootSplash exiting={splashExiting} />
{/if}

<div
	class="site-shell relative flex min-h-screen flex-col bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors duration-300"
	class:site-shell--entered={entered}
	class:site-shell--blocked={booting && !splashExiting}
	aria-hidden={booting && !splashExiting ? true : undefined}
>
	{#if !booting || splashExiting || entered}
		<ParticleField />

		<div class="site-header sticky top-0 z-[100] overflow-visible">
			<Header />
		</div>

		<main class="page-content relative z-[2] flex-1">
			{#if $content && ($i18nReady || !browser)}
				{@render children()}
			{/if}
		</main>

		<div class="site-footer relative z-[2]">
			<Footer />
		</div>

		<div class="site-float relative z-[50]">
			<FloatSidebar />
		</div>
		<div class="site-back-top relative z-[50]">
			<BackToTop />
		</div>
		<div class="site-line relative z-[50]">
			<ActiveLine />
		</div>
	{/if}
</div>

<style>
	:global(.site-shell) {
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* SSR / after boot */
	:global(.site-shell--entered) {
		opacity: 1;
		transform: translateY(0);
	}

	:global(.site-shell--blocked) {
		pointer-events: none;
		user-select: none;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.site-shell) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
