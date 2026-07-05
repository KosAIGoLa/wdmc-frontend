<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { t } from '$lib/i18n';
	import { services } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.kids')} | {$t('site.name')}</title>
	<meta name="description" content={services.kids.description} />
</svelte:head>

<PageBanner src={services.kids.image.src} alt={services.kids.image.alt} />

<PageIntro
	title={services.kids.title}
	subtitle={services.kids.subtitle}
	description={services.kids.description}
/>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.kids.sectionTitle')} />
		<div class="grid gap-6 sm:grid-cols-3">
			{#each services.kids.courses as course (course)}
				<div
					class="group rounded-lg bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
				>
					<h3 class="text-xl font-bold text-gray-800 transition-colors group-hover:text-orange-600">
						{course}
					</h3>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a
				href={services.kids.booking}
				target="_blank"
				rel="noopener external"
				class="inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
			>
				{$t('pages.kids.bookingBtn')}
			</a>
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.kids.brandTitle')}</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			{$t('pages.kids.brandDesc')}
		</p>
	</div>
</section>
