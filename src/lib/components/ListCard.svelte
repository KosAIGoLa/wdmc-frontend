<script lang="ts">
	interface Props {
		title: string;
		points: string[];
		compact?: boolean;
	}

	let { title, points, compact = false }: Props = $props();
</script>

<div
	class="group rounded-lg bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(17,24,39,0.11)] {compact
		? 'p-4'
		: 'p-6'}"
>
	<h4
		class="font-bold text-gray-800 transition-colors group-hover:text-orange-600 {compact
			? ''
			: 'text-lg'}"
	>
		{title}
	</h4>
	<ul class="list-inside list-disc text-sm text-gray-600 {compact ? 'mt-1' : 'mt-2'}">
		{#each points as point (point)}
			<li class="transition-colors group-hover:text-gray-700">{point}</li>
		{/each}
	</ul>
</div>
