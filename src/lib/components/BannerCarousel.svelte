<script lang="ts">
	import { onMount } from 'svelte';

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
	let paused = $state(false);

	function start() {
		if (banners.length <= 1) return;
		stop();
		timer = setInterval(() => {
			if (!paused) current = (current + 1) % banners.length;
		}, 5000);
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

	onMount(() => {
		start();
		return stop;
	});
</script>

<div
	class="group relative w-full overflow-hidden bg-[#1a1a2e]"
	role="region"
	aria-roledescription="carousel"
	aria-label="Banner"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
>
	<!-- Aspect ratio box -->
	<div class="relative aspect-[16/9] w-full sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[21/8]">
		{#each banners as banner, i (i)}
			<div
				class="absolute inset-0 overflow-hidden transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] {i ===
				current
					? 'z-[1] scale-100 opacity-100'
					: 'z-0 scale-[1.02] opacity-0'}"
				aria-hidden={i !== current}
			>
				<img
					src={banner.src}
					alt={i === current ? banner.alt : ''}
					class="banner-slide-img h-full w-full object-cover object-center"
					loading={i === 0 ? 'eager' : 'lazy'}
					decoding="async"
				/>
			</div>
		{/each}

		<!-- Soft bottom vignette for controls readability -->
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-black/30 via-black/10 to-transparent"
			aria-hidden="true"
		></div>
	</div>

	{#if banners.length > 1}
		<button
			type="button"
			class="absolute left-3 top-1/2 z-[3] -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white opacity-0 shadow-md backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-black/55 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white group-hover:opacity-100 sm:left-4"
			onclick={prev}
			aria-label="Previous banner"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<button
			type="button"
			class="absolute right-3 top-1/2 z-[3] -translate-y-1/2 rounded-full bg-black/35 p-2.5 text-white opacity-0 shadow-md backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-black/55 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white group-hover:opacity-100 sm:right-4"
			onclick={next}
			aria-label="Next banner"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>

		<div class="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2">
			{#each banners as banner, i (i)}
				<button
					type="button"
					class="h-2 rounded-full transition-all duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white {i ===
					current
						? 'w-7 bg-orange-500 shadow-[0_0_0_2px_rgba(255,255,255,0.35)]'
						: 'w-2 bg-white/65 hover:bg-white'}"
					onclick={() => go(i)}
					aria-label={`Go to banner ${i + 1}: ${banner.alt}`}
					aria-current={i === current ? 'true' : undefined}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.banner-slide-img {
		transform: scale(1.02);
		transition:
			transform 1.1s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.6s ease;
		will-change: transform;
	}

	:global(.group:hover) .banner-slide-img {
		transform: scale(1.08);
		filter: brightness(1.05) saturate(1.06);
	}

	@media (prefers-reduced-motion: reduce) {
		.banner-slide-img {
			transition: none;
		}

		:global(.group:hover) .banner-slide-img {
			transform: scale(1.02);
			filter: none;
		}
	}
</style>
