<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		description?: string;
	}

	let { title, subtitle, description }: Props = $props();
</script>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{title}</h1>
		{#if subtitle}
			<p class="mt-3 text-lg font-medium text-orange-600">{subtitle}</p>
		{/if}
		{#if description}
			<p class="mt-6 leading-relaxed text-gray-600">{description}</p>
		{/if}
	</div>
</section>
