<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { t, content } from '$lib/i18n';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.privacy')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.privacy.metaDescription')} />
</svelte:head>

{#if c}
	<section class="section">
		<div class="container-page max-w-4xl">
			<SectionTitle title={c.privacy.title} />
			<p class="mb-8 leading-relaxed text-gray-600">{$t('pages.privacy.intro')}</p>
			<div class="space-y-5">
				{#each c.privacy.sections as section (section.title)}
					<article class="card p-5">
						<h2 class="text-lg font-bold text-gray-900 transition-colors hover:text-[var(--color-brand)]">
							{section.title}
						</h2>
						<p class="mt-2 text-sm leading-relaxed text-gray-600">{section.content}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}
