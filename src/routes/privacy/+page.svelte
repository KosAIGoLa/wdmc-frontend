<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { t } from '$lib/i18n';
	import { privacy } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.privacy')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.privacy.metaDescription')} />
</svelte:head>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4">
		<SectionTitle title={privacy.title} />
		<div class="space-y-6 leading-relaxed text-gray-600">
			<p>{$t('pages.privacy.intro')}</p>
			{#each privacy.sections as section (section.title)}
				<div
					class="rounded-lg bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(17,24,39,0.1)]"
				>
					<h2 class="text-lg font-bold text-gray-800 transition-colors hover:text-orange-600">
						{section.title}
					</h2>
					<p class="mt-2">{section.content}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
