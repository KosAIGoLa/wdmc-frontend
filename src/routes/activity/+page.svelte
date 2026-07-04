<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { services, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>勢爵影視 | {site.name}</title>
	<meta name="description" content={services.activity.description} />
</svelte:head>

<img src={asset('index-banner2.jpg', true)} alt="勢爵影視" class="h-auto w-full" />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{services.activity.title}</h1>
		<p class="mt-3 text-lg font-medium text-orange-600">{services.activity.subtitle}</p>
		<p class="mt-6 leading-relaxed text-gray-600">{services.activity.description}</p>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="影視服務項目" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.activity.items as item (item.label)}
				<div class="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm">
					<img src={asset(item.icon)} alt={item.label} class="h-16 w-16 object-contain" />
					<h4 class="mt-4 font-bold text-gray-800">{item.label}</h4>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">活動紀錄與直播</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			勢爵影視提供專業的活動紀錄、直播技術與後製剪輯，從企業活動、記者會到大型典禮，都能完整記錄每一個精彩瞬間，並透過網路行銷與媒體平台營運，擴大活動影響力。
		</p>
		<div class="mt-8">
			<a href={resolve('/contact')} class="inline-block rounded bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700">立即洽詢</a>
		</div>
	</div>
</section>
