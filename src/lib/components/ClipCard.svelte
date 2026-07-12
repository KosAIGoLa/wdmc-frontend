<script lang="ts">
	interface Props {
		src: string;
		year: string;
		title: string;
		desc: string;
		index?: number;
	}

	let { src, year, title, desc, index = 0 }: Props = $props();

	const imageFirst = $derived(index < 2);
	const yellow = $derived(index === 1 || index === 2);
</script>

<article class="group grid min-h-[250px] overflow-hidden bg-[var(--color-surface-elevated)] md:grid-cols-2">
	{#if imageFirst}
		<div class="media-frame min-h-[220px] sm:min-h-[250px] md:h-full md:min-h-[250px]">
			<img {src} alt={title} class="min-h-[220px] sm:min-h-[250px]" loading="lazy" decoding="async" />
		</div>
	{/if}

	<div
		class="flex min-h-[220px] flex-col p-6 transition-colors duration-300 sm:min-h-[250px] sm:p-7 {yellow
			? 'bg-[#fbc600] text-white'
			: 'bg-[var(--color-surface-soft)] text-[var(--color-ink)]'}"
	>
		<p class="text-sm font-medium {yellow ? 'text-white/90' : 'text-[var(--color-muted)]'}">{year}</p>
		<h4 class="mt-5 text-lg font-black leading-snug sm:mt-6 sm:text-xl">{title}</h4>
		<p
			class="mt-4 line-clamp-3 text-[15px] font-semibold leading-relaxed sm:mt-5 sm:text-base {yellow
				? 'text-white/95'
				: 'text-[var(--color-muted)]'}"
		>
			{desc}
		</p>
		<div
			class="mt-auto flex items-center justify-end gap-3 pt-6 text-sm font-medium sm:gap-4 sm:pt-8 sm:text-base {yellow
				? 'text-white'
				: 'text-[#67b8de]'}"
		>
			<span>MORE</span>
			<span
				class="inline-block transition duration-300 ease-out group-hover:translate-x-1.5"
				aria-hidden="true">›</span
			>
		</div>
	</div>

	{#if !imageFirst}
		<div class="media-frame min-h-[220px] sm:min-h-[250px] md:h-full md:min-h-[250px]">
			<img {src} alt={title} class="min-h-[220px] sm:min-h-[250px]" loading="lazy" decoding="async" />
		</div>
	{/if}
</article>
