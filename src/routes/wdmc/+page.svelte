<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import ClipCard from '$lib/components/ClipCard.svelte';
	import { services, home, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>瓦當活動企劃 | {site.name}</title>
	<meta name="description" content={services.wdmc.description} />
</svelte:head>

<PageBanner src={asset('index-banner1.jpg', true)} alt="瓦當活動企劃" />

<PageIntro
	title={services.wdmc.title}
	subtitle={services.wdmc.subtitle}
	description={services.wdmc.description}
/>

<section class="bg-[#f8f5f2] py-16" id="case">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="活動整合行銷" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.items as item (item.label)}
				<IconCard icon={item.icon} label={item.label} />
			{/each}
		</div>
	</div>
</section>

<section class="py-16" id="act-item">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="精選活動特輯" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.featured as item (item.title)}
				<ActivityCard href={item.href} src={item.src} title={item.title} />
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="活動剪輯" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each home.clips.items as clip (clip.title)}
				<ClipCard src={clip.src} year={clip.year} title={clip.title} desc={clip.desc} />
			{/each}
		</div>
	</div>
</section>
