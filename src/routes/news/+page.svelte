<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { news, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>最新消息 | {site.name}</title>
	<meta name="description" content="瓦當麥可活動整合案例分享與最新消息" />
</svelte:head>

<BannerCarousel banners={news.banners} />

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="LATEST NEWS" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each news.items as item (item.id)}
				<article class="overflow-hidden rounded-lg bg-white shadow-sm">
					<img src={asset(item.image)} alt={item.title} class="h-56 w-full object-cover" />
					<div class="p-4">
						<p class="text-xs font-bold text-orange-600">{item.year}</p>
						<h3 class="mt-1 text-lg font-bold text-gray-800">{item.title}</h3>
						<p class="mt-2 line-clamp-3 text-sm text-gray-600">{item.desc}</p>
						<a href={resolve(`/news/${item.id}`)} class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline">
							SEE MORE
							<img src={asset('news-deco.png')} alt="" class="h-4 w-auto" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
