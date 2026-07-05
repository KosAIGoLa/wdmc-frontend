<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { services } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.talent')} | {$t('site.name')}</title>
	<meta name="description" content={services.talent.description} />
</svelte:head>

<PageBanner
	src="https://www.wdmc.tw/assets/images/active-performance-1.jpg"
	alt={$t('nav.talent')}
/>

<PageIntro
	title={services.talent.title}
	subtitle={services.talent.subtitle}
	description={services.talent.description}
/>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.talent.sectionTitle')} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.talent.items as item (item.label)}
				<div
					class="group rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
				>
					<h4 class="text-lg font-bold text-gray-800 transition-colors group-hover:text-orange-600">
						{item.label}
					</h4>
					<p class="mt-2 text-sm text-gray-600">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.talent.teamTitle')}</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			{$t('pages.talent.teamDesc')}
		</p>
		<div class="mt-8">
			<a
				href={resolve('/contact')}
				class="inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				>{$t('pages.talent.contactBtn')}</a
			>
		</div>
	</div>
</section>
