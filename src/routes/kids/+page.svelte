<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { services, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>童樂會 | {site.name}</title>
	<meta name="description" content={services.kids.description} />
</svelte:head>

<img src={services.kids.image.src} alt={services.kids.image.alt} class="h-auto w-full" />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{services.kids.title}</h1>
		<p class="mt-3 text-lg font-medium text-orange-600">{services.kids.subtitle}</p>
		<p class="mt-6 leading-relaxed text-gray-600">{services.kids.description}</p>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="兒童課程" />
		<div class="grid gap-6 sm:grid-cols-3">
			{#each services.kids.courses as course (course)}
				<div class="rounded-lg bg-white p-8 text-center shadow-sm">
					<h3 class="text-xl font-bold text-gray-800">{course}</h3>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href={services.kids.booking} target="_blank" rel="noopener external" class="inline-block rounded bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700">
				線上預約 |
			</a>
		</div>
	</div>
</section>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h2 class="text-2xl font-bold text-gray-800">親子品牌經營</h2>
		<p class="mt-4 leading-relaxed text-gray-600">
			從課程規劃、活動執行到品牌經營，童樂會協助親子品牌打造完整體驗。我們也提供兒童抓周、親子活動等客製化服務，讓每個家庭留下美好回憶。
		</p>
	</div>
</section>
