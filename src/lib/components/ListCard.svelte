<script lang="ts">
	interface Props {
		title: string;
		points: string[];
		compact?: boolean;
	}

	let { title, points, compact = false }: Props = $props();
</script>

<div class="card group {compact ? 'p-4' : 'p-6'}">
	<h4
		class="font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)] {compact
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
