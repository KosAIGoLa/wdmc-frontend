<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { services, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>尾牙春酒專案 | {site.name}</title>
	<meta name="description" content={services.active.title} />
</svelte:head>

<BannerCarousel banners={services.active.banners} />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-2xl font-bold text-gray-800 md:text-3xl">{services.active.title}</h1>
		<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		<div class="mt-6 space-y-2 leading-relaxed text-gray-600">
			{#each services.active.description as line (line)}
				<p>{line}</p>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<img src={services.active.aboutImage} alt="尾牙春酒專案" class="rounded-lg shadow-sm" />
			<div>
				<h2 class="text-2xl font-bold text-gray-800">客製化尾牙春酒活動內容</h2>
				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					{#each services.active.items as item (item.title)}
						<div class="rounded-lg bg-white p-4 shadow-sm">
							<h4 class="font-bold text-gray-800">{item.title}</h4>
							<ul class="mt-1 list-inside list-disc text-sm text-gray-600">
								{#each item.points as point (point)}
									<li>{point}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-16" id="performance">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="尾牙春酒 | 表演" />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.active.performance as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt="成功案例" class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services.active.special as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt="特別企劃" class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">立刻洽詢我們！</h2>
		<p class="mt-2 text-gray-600">索取尾牙春酒企劃書</p>
		<a href={resolve('/contact')} class="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-700">聯絡我們</a>
	</div>
</section>
