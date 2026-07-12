<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';

	const c = $derived($content);
	const active = $derived(c?.services.active);
</script>

<svelte:head>
	<title>{$t('nav.active')} | {$t('site.name')}</title>
	<meta name="description" content={active?.title ?? ''} />
</svelte:head>

{#if active}
	<BannerCarousel
		banners={services.active.banners.map((b, i) => ({
			src: b.src,
			alt: active.bannersAlt[i] ?? ''
		}))}
	/>

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{active.title}</h1>
			<div class="mt-6 space-y-1 text-gray-600">
				{#each active.description as line (line)}
					<p>{line}</p>
				{/each}
			</div>
			<div class="card group mx-auto mt-8 max-w-2xl overflow-hidden p-0">
				<div class="media-frame media-frame--soft">
					<img src={services.active.aboutImage} alt={active.bannersAlt[0]} />
				</div>
			</div>
		</div>
	</section>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.active.customTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each active.items as item (item.title)}
					<ListCard title={item.title} points={[...item.points]} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section" id="performance">
		<div class="container-page">
			<SectionTitle title={$t('pages.active.sectionTitle')} />
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each services.active.performance as img (img)}
					<div class="media-frame media-frame--lift group aspect-[4/3] rounded-2xl">
						<img src={asset(img)} alt={$t('pages.active.caseAlt')} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.active.specialAlt')} />
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each services.active.special as img (img)}
					<div class="media-frame media-frame--lift group aspect-[4/3] rounded-2xl">
						<img src={asset(img)} alt={$t('pages.active.specialAlt')} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section text-center">
		<div class="container-page max-w-2xl">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.active.ctaTitle')}</h2>
			<p class="mt-2 text-gray-600">{$t('pages.active.ctaSubtitle')}</p>
			<a href={resolve('/contact')} class="btn-primary mt-6">{$t('pages.active.contactBtn')}</a>
		</div>
	</section>
{/if}
