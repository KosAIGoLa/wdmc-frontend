<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { news, asset, site } from '$lib/data/site';

	const item = $derived(news.items.find((n) => n.id === page.params.id));
</script>

<svelte:head>
	<title>{item?.title ?? '最新消息'} | {site.name}</title>
	<meta name="description" content={item?.desc ?? ''} />
</svelte:head>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4">
		{#if item}
			<img src={asset(item.image)} alt={item.title} class="h-auto w-full rounded-lg" />
			<div class="mt-6">
				<p class="text-sm font-bold text-orange-600">{item.year}</p>
				<h1 class="mt-2 text-2xl font-bold text-gray-800 md:text-3xl">{item.title}</h1>
				<p class="mt-4 leading-relaxed text-gray-600">{item.desc}</p>
				<div class="mt-8">
					<a href={resolve('/news')} class="inline-block text-sm font-bold text-orange-600 hover:underline">← 返回案例分享</a>
				</div>
			</div>
		{:else}
			<p class="text-center text-gray-600">找不到此消息。</p>
			<a href={resolve('/news')} class="mt-4 block text-center text-orange-600 hover:underline">返回案例分享</a>
		{/if}
	</div>
</section>
