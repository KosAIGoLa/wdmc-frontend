<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.activity')} | {$t('site.name')}</title>
	<meta name="description" content={services.activity.description} />
</svelte:head>

<PageBanner src={asset('index-banner2.jpg', true)} alt={$t('nav.activity')} />

<PageIntro
	title={services.activity.title}
	subtitle={services.activity.subtitle}
	description={services.activity.description}
/>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.activity.sectionTitle')} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.activity.items as item (item.label)}
				<IconCard icon={item.icon} label={item.label} />
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.activity.recordingTitle')}</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			{$t('pages.activity.recordingDesc')}
		</p>
		<div class="mt-8">
			<a
				href={resolve('/contact')}
				class="inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				>{$t('pages.activity.contactBtn')}</a
			>
		</div>
	</div>
</section>
