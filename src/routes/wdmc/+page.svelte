<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import ClipCard from '$lib/components/ClipCard.svelte';
	import { t, content } from '$lib/i18n';
	import { home, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.wdmc')} | {$t('site.name')}</title>
	<meta name="description" content={c?.services.wdmc.description ?? ''} />
</svelte:head>

{#if c}
	<PageBanner src={asset('index-banner1.jpg', true)} alt={c.services.wdmc.title} />

	<PageIntro
		title={c.services.wdmc.title}
		subtitle={c.services.wdmc.subtitle}
		description={c.services.wdmc.description}
	/>

	<section class="section section-soft" id="case">
		<div class="container-page">
			<SectionTitle title={$t('pages.wdmc.marketingTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.marketing.items as item, i (i)}
					<IconCard icon={item.icon} label={c.home.marketing.items[i] ?? ''} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section" id="act-item">
		<div class="container-page">
			<SectionTitle title={$t('pages.wdmc.featuredTitle')} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.featured.items as item, i (i)}
					<ActivityCard
						href={item.href}
						src={item.src}
						title={c.home.featured.items[i] ?? ''}
					/>
				{/each}
			</div>
		</div>
	</section>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.wdmc.clipsTitle')} />
			<div class="overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:grid md:grid-cols-2">
				{#each home.clips.items as clip, index (index)}
					{@const text = c.home.clips.items[index]}
					<ClipCard
						src={clip.src}
						year={text?.year ?? ''}
						title={text?.title ?? ''}
						desc={text?.desc ?? ''}
						{index}
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}
