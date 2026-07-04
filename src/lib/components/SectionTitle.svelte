<script lang="ts">
	import { asset } from '$lib/data/site';

	interface Props {
		title: string;
		subtitle?: string;
		light?: boolean;
	}

	let { title, subtitle, light = false }: Props = $props();
</script>

<div class="mb-8 text-center">
	<h2 class="text-2xl font-bold tracking-wide md:text-3xl {light ? 'text-white' : 'text-gray-800'}">
		{title}
	</h2>
	{#if subtitle}
		<p class="mt-2 text-xs font-light uppercase tracking-widest {light ? 'text-gray-200' : 'text-gray-500'}">
			{subtitle}
		</p>
	{/if}
	<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
</div>
