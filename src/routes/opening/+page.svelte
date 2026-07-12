<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';

	const c = $derived($content);
	const opening = $derived(c?.services.opening);
</script>

<svelte:head>
	<title>{$t('nav.opening')} | {$t('site.name')}</title>
	<meta name="description" content={opening?.title ?? ''} />
</svelte:head>

{#if opening}
	<PageBanner src={services.opening.banner.src} alt={opening.bannerAlt} />

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{opening.title}</h1>
			<div class="mt-6 space-y-1 text-gray-600">
				{#each opening.description as line (line)}
					<p>{line}</p>
				{/each}
			</div>
			<div class="card group mx-auto mt-8 max-w-2xl overflow-hidden p-0">
				<div class="media-frame media-frame--soft">
					<img src={services.opening.aboutImage} alt={opening.bannerAlt} />
				</div>
			</div>
		</div>
	</section>

	{#each opening.sections as section (section.title)}
		<section class="section section-soft">
			<div class="container-page">
				<SectionTitle title={section.title} />
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{#each section.items as item (item.title)}
						<ListCard title={item.title} points={[...item.points]} />
					{/each}
				</div>
			</div>
		</section>
	{/each}

	<section class="section">
		<div class="container-page">
			<SectionTitle title={$t('pages.opening.caseAlt')} />
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each services.opening.gallery as img (img)}
					<div class="media-frame media-frame--lift group aspect-[4/3] rounded-2xl">
						<img src={asset(img)} alt={$t('pages.opening.caseAlt')} loading="lazy" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section section-soft text-center">
		<div class="container-page max-w-2xl">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.opening.ctaTitle')}</h2>
			<p class="mt-2 text-gray-600">{$t('pages.opening.ctaSubtitle')}</p>
			<a href={resolve('/contact')} class="btn-primary mt-6">{$t('pages.opening.contactBtn')}</a>
		</div>
	</section>
{/if}
