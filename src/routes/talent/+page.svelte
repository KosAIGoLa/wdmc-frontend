<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.talent')} | {$t('site.name')}</title>
	<meta name="description" content={c?.services.talent.description ?? ''} />
</svelte:head>

{#if c}
	<PageBanner src={asset('index-banner2.jpg', true)} alt={c.services.talent.title} />

	<PageIntro
		title={c.services.talent.title}
		subtitle={c.services.talent.subtitle}
		description={c.services.talent.description}
	/>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.talent.sectionTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each c.services.talent.items as item (item.label)}
					<div class="card group p-6">
						<h4
							class="text-lg font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)]"
						>
							{item.label}
						</h4>
						<p class="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.talent.teamTitle')}</h2>
			<p class="mt-4 leading-relaxed text-gray-600">{$t('pages.talent.teamDesc')}</p>
			<a href={resolve('/contact')} class="btn-primary mt-8">{$t('pages.talent.contactBtn')}</a>
		</div>
	</section>
{/if}
