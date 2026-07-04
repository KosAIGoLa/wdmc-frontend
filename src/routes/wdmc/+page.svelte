<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { services, home, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>瓦當活動企劃 | {site.name}</title>
	<meta name="description" content={services.wdmc.description} />
</svelte:head>

<img src={asset('index-banner1.jpg', true)} alt="瓦當活動企劃" class="h-auto w-full" />

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{services.wdmc.title}</h1>
		<p class="mt-3 text-lg font-medium text-orange-600">{services.wdmc.subtitle}</p>
		<p class="mt-6 leading-relaxed text-gray-600">{services.wdmc.description}</p>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16" id="case">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="活動整合行銷" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.items as item (item.label)}
				<div class="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm">
					<img src={asset(item.icon)} alt={item.label} class="h-16 w-16 object-contain" />
					<h4 class="mt-4 font-bold text-gray-800">{item.label}</h4>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16" id="act-item">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="精選活動特輯" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services.wdmc.featured as item (item.title)}
				<a href={item.href} class="group overflow-hidden rounded-lg bg-white shadow-sm">
					<div class="overflow-hidden">
						<img src={item.src} alt={item.title} class="h-56 w-full object-cover transition group-hover:scale-105" />
					</div>
					<div class="p-4 text-center">
						<h4 class="font-bold text-gray-800">{item.title}</h4>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="活動剪輯" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each home.clips.items as clip (clip.title)}
				<div class="overflow-hidden rounded-lg bg-white shadow-sm">
					<img src={clip.src} alt={clip.title} class="h-48 w-full object-cover" />
					<div class="p-4">
						<p class="text-xs text-gray-400">{clip.year}</p>
						<h4 class="mt-1 font-bold text-gray-800">{clip.title}</h4>
						<p class="mt-2 text-sm text-gray-600">{clip.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
