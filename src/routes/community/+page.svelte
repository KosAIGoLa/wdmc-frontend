<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { services, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>硬體搭建 | {site.name}</title>
	<meta name="description" content={services.community.description} />
</svelte:head>

<BannerCarousel banners={services.active.banners} />

<PageIntro
	title={services.community.title}
	subtitle={services.community.subtitle}
	description={services.community.description}
/>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="硬體設備與搭建服務" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.community.items as item (item.title)}
				<ListCard title={item.title} points={item.points} />
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="搭建案例" />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.community.gallery as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt="搭建案例" class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">需要硬體設備支援？</h2>
		<p class="mt-2 text-gray-600">歡迎私訊小編或加我們的官方Line，老闆會親自回覆您。</p>
		<a href={resolve('/contact')} class="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-700">聯絡我們</a>
	</div>
</section>
