<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import ClipCard from '$lib/components/ClipCard.svelte';
	import { t } from '$lib/i18n';
	import { services, home, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.wdmc')} | {$t('site.name')}</title>
	<meta name="description" content={services.wdmc.description} />
</svelte:head>

<PageBanner src={asset('index-banner1.jpg', true)} alt={$t('nav.wdmc')} />

<PageIntro
	title={services.wdmc.title}
	subtitle={services.wdmc.subtitle}
	description={services.wdmc.description}
/>

<section class="bg-[#f8f5f2] py-16" id="case">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.wdmc.marketingTitle')} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.items as item (item.label)}
				<IconCard icon={item.icon} label={item.label} />
			{/each}
		</div>
	</div>
</section>

<section class="py-16" id="act-item">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.wdmc.featuredTitle')} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.featured as item (item.title)}
				<ActivityCard href={item.href} src={item.src} title={item.title} />
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.wdmc.clipsTitle')} />
		<div class="grid overflow-hidden md:grid-cols-2">
			{#each home.clips.items as clip, index (clip.title)}
				<ClipCard src={clip.src} year={clip.year} title={clip.title} desc={clip.desc} {index} />
			{/each}
		</div>
	</div>
</section>
