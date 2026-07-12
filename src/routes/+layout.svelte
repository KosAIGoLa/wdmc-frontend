<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatSidebar from '$lib/components/FloatSidebar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import ActiveLine from '$lib/components/ActiveLine.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

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

		return new Promise<void>((resolve) => {
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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-white text-[#302D2C]">
	<div class="site-header sticky top-0 z-[100] overflow-visible">
		<Header />
	</div>

	<main class="page-content relative z-0 flex-1">
		{@render children()}
	</main>

	<div class="site-footer">
		<Footer />
	</div>

	<div class="site-float">
		<FloatSidebar />
	</div>
	<div class="site-back-top">
		<BackToTop />
	</div>
	<div class="site-line">
		<ActiveLine />
	</div>
</div>
