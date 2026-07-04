<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { staff, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>培訓活動工作人員 | {site.name}</title>
	<meta name="description" content={staff.description} />
</svelte:head>

<img src={staff.banner.src} alt={staff.banner.alt} class="h-auto w-full" />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<SectionTitle title={staff.title} />
		<h2 class="text-3xl font-bold text-gray-800">{staff.planTitle}</h2>
		<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		<p class="mt-6 leading-relaxed text-gray-600">{staff.description}</p>
		<img src={asset('graphic.png', true)} alt="" class="mx-auto mt-8 h-24 w-auto" />
		<div class="mt-8">
			<a href={staff.form} target="_blank" rel="noopener external" class="inline-block rounded bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700">
				有興趣加入培訓 |
			</a>
		</div>
	</div>
</section>
