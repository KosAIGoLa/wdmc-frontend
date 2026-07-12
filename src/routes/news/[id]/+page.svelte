<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { news, asset } from '$lib/data/site';

	const item = $derived(news.items.find((n) => n.id === page.params.id));
	const text = $derived(
		item && $content ? $content.news.items[item.id as keyof typeof $content.news.items] : undefined
	);
</script>

<svelte:head>
	<title>{text?.title ?? $t('nav.news')} | {$t('site.name')}</title>
	<meta name="description" content={text?.desc?.replace(/<br\s*\/?>/gi, ' ') ?? ''} />
</svelte:head>

<section class="section">
	<div class="container-page max-w-4xl">
		{#if item && text}
			<div class="card group overflow-hidden p-0">
				<div class="media-frame media-frame--soft">
					<img src={asset(item.image)} alt={text.title} />
				</div>
			</div>
			<div class="mt-6">
				<p class="text-sm font-bold text-[var(--color-brand)]">{item.year}</p>
				<h1 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
					{text.title}
				</h1>
				<div class="mt-4 space-y-2 leading-relaxed text-gray-600">
					{#each text.desc.split(/<br\s*\/?>/i) as para, i (i)}
						<p>{para}</p>
					{/each}
				</div>
				<div class="mt-8">
					<a href={resolve('/news')} class="btn-outline">{$t('pages.news.back')}</a>
				</div>
			</div>
		{:else if item && !$content}
			<!-- wait for content -->
		{:else}
			<p class="text-center text-gray-600">{$t('pages.news.notFound')}</p>
			<a href={resolve('/news')} class="btn-outline mx-auto mt-4 block w-fit"
				>{$t('pages.news.backLink')}</a
			>
		{/if}
	</div>
</section>
