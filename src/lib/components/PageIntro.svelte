<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		description?: string;
	}

	let { title, subtitle, description }: Props = $props();
</script>

<section class="section">
	<div class="container-page max-w-4xl text-center">
		<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
			{title}
		</h1>
		{#if subtitle}
			<p class="mt-3 text-base font-medium text-[var(--color-brand)] sm:text-lg">{subtitle}</p>
		{/if}
		{#if description}
			<p class="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-gray-600 sm:mt-6 sm:text-base">
				{description}
			</p>
		{/if}
	</div>
</section>
