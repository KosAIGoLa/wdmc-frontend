<script lang="ts">
	import { asset } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';

	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > 300;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(handleScroll);
</script>

<svelte:window onscroll={handleScroll} />

<button
	type="button"
	onclick={scrollToTop}
	class="fixed bottom-[50px] right-0 z-[999] aspect-square w-[clamp(48px,5vw,70px)] cursor-pointer border-0 bg-transparent p-0 leading-none transition-all duration-300 hover:opacity-85 {visible
		? 'translate-y-0 opacity-100'
		: 'pointer-events-none translate-y-4 opacity-0'}"
	aria-label={$t('common.backToTop')}
>
	<img src={asset('top.png', true)} alt="top" class="block w-full" />
</button>
