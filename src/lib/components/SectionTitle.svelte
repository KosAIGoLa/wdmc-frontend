<script lang="ts">
	import { asset } from '$lib/data/site';

	interface Props {
		title: string;
		subtitle?: string;
		light?: boolean;
	}

	let { title, subtitle, light = false }: Props = $props();
</script>

<div class="group mb-8 text-center md:mb-10">
	<h2
		class="text-2xl font-bold tracking-tight md:text-3xl {light ? 'text-white' : 'text-gray-900'}"
	>
		{title}
	</h2>
	{#if subtitle}
		<p
			class="mt-2 text-xs font-medium uppercase tracking-[0.18em] {light
				? 'text-white/80'
				: 'text-gray-500'}"
		>
			{subtitle}
		</p>
	{/if}
	<img
		src={asset('deco.png', true)}
		alt=""
		class="mx-auto mt-4 h-3.5 w-auto opacity-90 transition duration-300 ease-out group-hover:scale-110 sm:h-4"
		aria-hidden="true"
	/>
</div>
