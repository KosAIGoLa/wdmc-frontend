<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.community')} | {$t('site.name')}</title>
	<meta name="description" content={services.community.description} />
</svelte:head>

<BannerCarousel banners={services.active.banners} />

<PageIntro
	title={services.community.title}
	subtitle={services.community.subtitle}
	description={services.community.description}
/>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.community.sectionTitle')} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.community.items as item (item.title)}
				<ListCard title={item.title} points={item.points} />
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.community.galleryTitle')} />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.community.gallery as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt={$t('pages.community.caseAlt')} class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.community.ctaTitle')}</h2>
		<p class="mt-2 text-gray-600">{$t('pages.community.ctaSubtitle')}</p>
		<a href={resolve('/contact')} class="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-700">{$t('pages.community.contactBtn')}</a>
	</div>
</section>
