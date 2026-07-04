<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { resolve } from '$app/paths';
	import { services, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>開工動土｜開幕剪綵 | {site.name}</title>
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
			<img src={services.opening.aboutImage} alt="開工動土活動企劃" class="rounded-lg shadow-sm" />
			<div>
				<h2 class="text-2xl font-bold text-gray-800">開工剪綵典禮活動內容</h2>
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
		<SectionTitle title="成功案例" />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			{#each services.opening.gallery as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt="成功案例" class="h-48 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16 text-center">
	<div class="mx-auto max-w-2xl px-4">
		<h2 class="text-2xl font-bold text-gray-800">立刻洽詢我們！</h2>
		<p class="mt-2 text-gray-600">索取開工動土｜開幕剪綵企劃書</p>
		<a href={resolve('/contact')} class="mt-6 inline-block rounded bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-700">聯絡我們</a>
	</div>
</section>
