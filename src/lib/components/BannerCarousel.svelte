<script lang="ts">
	interface Banner {
		src: string;
		alt: string;
	}

	interface Props {
		banners: Banner[];
	}

	let { banners }: Props = $props();
	let current = $state(0);
	let timer: ReturnType<typeof setInterval>;

	function start() {
		stop();
		timer = setInterval(() => (current = (current + 1) % banners.length), 5000);
	}
	function stop() {
		clearInterval(timer);
	}
	function go(index: number) {
		current = index;
		start();
	}
	function prev() {
		current = (current - 1 + banners.length) % banners.length;
		start();
	}
	function next() {
		current = (current + 1) % banners.length;
		start();
	}

	start();
</script>

<div class="group relative w-full overflow-hidden" onmouseenter={stop} onmouseleave={start} role="region" aria-roledescription="carousel">
	{#each banners as banner, i (i)}
		<div class="absolute inset-0 transition-opacity duration-700 {i === current ? 'opacity-100' : 'opacity-0'}">
			<img src={banner.src} alt={banner.alt} class="h-full w-full object-cover" />
		</div>
	{/each}
	<div class="relative aspect-[16/7] w-full md:aspect-[16/6]"></div>

	{#if banners.length > 1}
		<button
			class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition hover:bg-black/50 group-hover:opacity-100"
			onclick={prev}
			aria-label="Previous banner"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition hover:bg-black/50 group-hover:opacity-100"
			onclick={next}
			aria-label="Next banner"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
		<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
			{#each banners as banner, i (i)}
				<button
					class="h-2 w-2 rounded-full transition {i === current ? 'bg-orange-500' : 'bg-white/70'}"
					onclick={() => go(i)}
					aria-label={`Go to banner ${i + 1}: ${banner.alt}`}
				></button>
			{/each}
		</div>
	{/if}
</div>
