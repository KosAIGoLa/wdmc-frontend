<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { home, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.activity')} | {$t('site.name')}</title>
	<meta name="description" content={c?.services.activity.description ?? ''} />
</svelte:head>

{#if c}
	<PageBanner src={asset('index-banner2.jpg', true)} alt={c.services.activity.title} />

	<PageIntro
		title={c.services.activity.title}
		subtitle={c.services.activity.subtitle}
		description={c.services.activity.description}
	/>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.activity.sectionTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.media.items as item, i (i)}
					<IconCard icon={item.icon} label={c.home.media.items[i] ?? ''} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.activity.recordingTitle')}</h2>
			<p class="mt-4 leading-relaxed text-gray-600">{$t('pages.activity.recordingDesc')}</p>
			<a href={resolve('/contact')} class="btn-primary mt-8">{$t('pages.activity.contactBtn')}</a>
		</div>
	</section>
{/if}
