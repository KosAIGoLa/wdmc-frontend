<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';

	const c = $derived($content);
	const community = $derived(c?.services.community);
</script>

<svelte:head>
	<title>{$t('nav.community')} | {$t('site.name')}</title>
	<meta name="description" content={community?.description ?? ''} />
</svelte:head>

{#if community}
	<PageBanner src={asset('index-banner1.jpg', true)} alt={community.title} />

	<PageIntro
		title={community.title}
		subtitle={community.subtitle}
		description={community.description}
	/>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.community.sectionTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each community.items as item (item.title)}
					<ListCard title={item.title} points={[...item.points]} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container-page">
			<SectionTitle title={$t('pages.community.galleryTitle')} />
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each services.community.gallery as img (img)}
					<div class="media-frame media-frame--lift group aspect-[4/3] rounded-2xl">
						<img src={asset(img)} alt={$t('pages.community.caseAlt')} loading="lazy" />
					</div>
				{/each}
			</div>
			<div class="mt-10 text-center">
				<a href={resolve('/contact')} class="btn-primary">{$t('pages.community.contactBtn')}</a>
			</div>
		</div>
	</section>

	<section class="section section-soft text-center">
		<div class="container-page max-w-2xl">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.community.ctaTitle')}</h2>
			<p class="mt-2 text-gray-600">{$t('pages.community.ctaSubtitle')}</p>
		</div>
	</section>
{/if}
