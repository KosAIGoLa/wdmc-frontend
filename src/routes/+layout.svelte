<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatSidebar from '$lib/components/FloatSidebar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import ActiveLine from '$lib/components/ActiveLine.svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}

	onNavigate((navigation) => {
		// Same-path hash navigations don't need a full page transition
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
			return;
		}

		if (!document.startViewTransition) {
			return navigation.complete.then(scrollToTop);
		}

		/*
		 * Wait one frame so Header's beforeNavigate can instant-close the mobile
		 * drawer and paint a stable top bar before VT snapshots the old DOM.
		 * Without this, mobile nav collapse mid-transition causes a visible hitch.
		 */
		return new Promise<void>((resolve) => {
			requestAnimationFrame(() => {
				const transition = document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
					// Reset scroll after the new page is in the DOM (before VT paints new frame)
					scrollToTop();
				});

				// Ignore abort errors when a newer navigation supersedes this one
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

<div
	class="site-shell relative flex min-h-screen flex-col bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors duration-300"
>
	<ParticleField />

	<div class="site-header sticky top-0 z-[100] overflow-visible">
		<Header />
	</div>

	<main class="page-content relative z-[2] flex-1">
		{@render children()}
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
</div>
