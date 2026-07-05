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

<article class="group grid min-h-[250px] overflow-hidden bg-white md:grid-cols-2">
	{#if imageFirst}
		<div class="overflow-hidden">
			<img
				{src}
				alt={title}
				class="h-[250px] w-full object-cover transition duration-500 ease-out group-hover:scale-110"
			/>
		</div>
	{/if}

	<div
		class="flex min-h-[250px] flex-col p-7 {yellow
			? 'bg-[#fbc600] text-white'
			: 'bg-[#f4f4f4] text-[#222]'}"
	>
		<p class="text-sm font-medium {yellow ? 'text-white' : 'text-[#9aa0a6]'}">{year}</p>
		<h4 class="mt-6 text-xl font-black leading-snug">{title}</h4>
		<p
			class="mt-5 line-clamp-3 text-base font-semibold leading-relaxed {yellow
				? 'text-white'
				: 'text-[#9aa0a6]'}"
		>
			{desc}
		</p>
		<div
			class="mt-auto flex items-center justify-end gap-4 pt-8 text-base font-medium {yellow
				? 'text-white'
				: 'text-[#67b8de]'}"
		>
			<span>MORE</span>
			<span class="transition duration-300 group-hover:translate-x-1" aria-hidden="true">›</span>
		</div>
	</div>

	{#if !imageFirst}
		<div class="overflow-hidden">
			<img
				{src}
				alt={title}
				class="h-[250px] w-full object-cover transition duration-500 ease-out group-hover:scale-110"
			/>
		</div>
	{/if}
</article>
