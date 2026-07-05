<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { news, asset } from '$lib/data/site';

	const item = $derived(news.items.find((n) => n.id === page.params.id));
</script>

<svelte:head>
	<title>{item?.title ?? $t('nav.news')} | {$t('site.name')}</title>
	<meta name="description" content={item?.desc ?? ''} />
</svelte:head>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4">
		{#if item}
			<div
				class="overflow-hidden rounded-lg shadow-sm transition duration-300 hover:shadow-[0_16px_34px_rgba(17,24,39,0.14)]"
			>
				<img
					src={asset(item.image)}
					alt={item.title}
					class="h-auto w-full transition duration-700 ease-out hover:scale-[1.03]"
				/>
			</div>
			<div class="mt-6">
				<p class="text-sm font-bold text-orange-600">{item.year}</p>
				<h1 class="mt-2 text-2xl font-bold text-gray-800 md:text-3xl">{item.title}</h1>
				<p class="mt-4 leading-relaxed text-gray-600">{item.desc}</p>
				<div class="mt-8">
					<a
						href={resolve('/news')}
						class="inline-block rounded-full border border-orange-600 px-5 py-2 text-sm font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
						>{$t('pages.news.back')}</a
					>
				</div>
			</div>
		{:else}
			<p class="text-center text-gray-600">{$t('pages.news.notFound')}</p>
			<a
				href={resolve('/news')}
				class="mx-auto mt-4 block w-fit rounded-full border border-orange-600 px-5 py-2 text-center font-bold text-orange-600 transition hover:bg-orange-600 hover:text-white"
				>{$t('pages.news.backLink')}</a
			>
		{/if}
	</div>
</section>
