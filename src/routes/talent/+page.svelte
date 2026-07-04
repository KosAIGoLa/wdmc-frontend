<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { services, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>表演培訓 | {site.name}</title>
	<meta name="description" content={services.talent.description} />
</svelte:head>

<img src="https://www.wdmc.tw/assets/images/active-performance-1.jpg" alt="表演培訓" class="h-auto w-full" />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{services.talent.title}</h1>
		<p class="mt-3 text-lg font-medium text-orange-600">{services.talent.subtitle}</p>
		<p class="mt-6 leading-relaxed text-gray-600">{services.talent.description}</p>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="表演與培訓項目" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.talent.items as item (item.label)}
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h4 class="text-lg font-bold text-gray-800">{item.label}</h4>
					<p class="mt-2 text-sm text-gray-600">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">專業表演團隊</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			瓦當麥可擁有豐富的表演人才資料庫，無論是大型活動、企業尾牙、開幕典禮或親子活動，都能為您媒合最適合的表演團隊與主持人。
		</p>
		<div class="mt-8">
			<a href={resolve('/contact')} class="inline-block rounded bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700">洽詢表演合作</a>
		</div>
	</div>
</section>
