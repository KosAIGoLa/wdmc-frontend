<script lang="ts">
	import { asset } from '$lib/data/site';

	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > 300;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onscroll={handleScroll} />

<button
	type="button"
	onclick={scrollToTop}
	class="fixed bottom-[50px] right-0 z-[999] w-[clamp(48px,5vw,70px)] cursor-pointer border-none bg-none transition-all duration-300 hover:opacity-85 {visible
		? 'translate-y-0 opacity-100'
		: 'pointer-events-none translate-y-4 opacity-0'}"
	aria-label="回到頂部"
>
	<img src={asset('top.png', true)} alt="top" class="w-full" />
</button>
