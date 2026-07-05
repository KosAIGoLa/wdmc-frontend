<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { services, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('nav.opening')} | {$t('site.name')}</title>
	<meta name="description" content={services.opening.title} />
</svelte:head>

<PageBanner src={services.opening.banner.src} alt={services.opening.banner.alt} />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-2xl font-bold text-gray-800 md:text-3xl">{services.opening.title}</h1>
		<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		<div class="mt-6 space-y-2 leading-relaxed text-gray-600">
			{#each services.opening.description as line (line)}
				<p>{line}</p>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<div
				class="overflow-hidden rounded-lg shadow-sm transition duration-300 hover:shadow-[0_16px_34px_rgba(17,24,39,0.14)]"
			>
				<img
					src={services.opening.aboutImage}
					alt={$t('nav.opening')}
					class="transition duration-700 ease-out hover:scale-[1.03]"
				/>
			</div>
			<div>
				<h2 class="text-2xl font-bold text-gray-800">{$t('pages.opening.customTitle')}</h2>
				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					{#each services.opening.sections[0].items as item (item.title)}
						<ListCard title={item.title} points={item.points} compact />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-16" id="performance">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.opening.sectionTitle')} />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			{#each services.opening.gallery as img (img)}
				<div
					class="group overflow-hidden rounded-lg shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<img
						src={asset(img)}
						alt={$t('pages.opening.caseAlt')}
						class="h-48 w-full object-cover transition duration-500 ease-out group-hover:scale-110"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">{$t('pages.opening.ctaTitle')}</h2>
		<p class="mt-2 text-gray-600">{$t('pages.opening.ctaSubtitle')}</p>
		<a
			href={resolve('/contact')}
			class="mt-6 inline-block rounded-full bg-orange-600 px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
			>{$t('pages.opening.contactBtn')}</a
		>
	</div>
</section>
