<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.active')} | {$t('site.name')}</title>
	<meta name="description" content={services.active.title} />
</svelte:head>

<BannerCarousel banners={services.active.banners} />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-2xl font-bold text-gray-800 md:text-3xl">{services.active.title}</h1>
		<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		<div class="mt-6 space-y-2 leading-relaxed text-gray-600">
			{#each services.active.description as line (line)}
				<p>{line}</p>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<img src={services.active.aboutImage} alt={$t('nav.active')} class="rounded-lg shadow-sm" />
			<div>
				<h2 class="text-2xl font-bold text-gray-800">{$t('pages.active.customTitle')}</h2>
				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					{#each services.active.items as item (item.title)}
						<ListCard title={item.title} points={item.points} compact />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-16" id="performance">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.active.sectionTitle')} />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.active.performance as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt={$t('pages.active.caseAlt')} class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.active.special as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt={$t('pages.active.specialAlt')} class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.active.ctaTitle')}</h2>
		<p class="mt-2 text-gray-600">{$t('pages.active.ctaSubtitle')}</p>
		<a href={resolve('/contact')} class="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-700">{$t('pages.active.contactBtn')}</a>
	</div>
</section>
