<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { about, asset, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>關於我們 | {site.name}</title>
	<meta name="description" content={about.intro} />
</svelte:head>

<img src={about.banner.src} alt={about.banner.alt} class="h-auto w-full" />

<!-- Features -->
<section class="py-12">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each about.features as feature (feature.title)}
				<div class="flex flex-col items-center text-center">
					<img src={asset(feature.icon)} alt={feature.title} class="h-20 w-20 object-contain" />
					<h3 class="mt-4 font-bold text-gray-800">{feature.title}</h3>
					{#each feature.en as line (line)}
						<p class="text-xs uppercase tracking-wider text-gray-400">{line}</p>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- About intro -->
<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<SectionTitle title="ABOUT US" />
		<p class="leading-relaxed text-gray-600">{about.intro}</p>
	</div>
</section>

<!-- Team -->
<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each about.team as member (member.name)}
				<div class="overflow-hidden rounded-lg bg-white shadow-sm">
					<img src={asset(member.image)} alt={member.name} class="h-64 w-full object-cover" />
					<div class="p-4 text-center">
						<h4 class="font-bold text-gray-800">{member.name}</h4>
						<p class="text-xs uppercase tracking-wider text-gray-400">{member.en}</p>
						<p class="mt-2 font-medium text-orange-600">{member.role}</p>
						<p class="mt-1 text-sm text-gray-600">{member.edu}</p>
						{#if member.ext}
							<p class="mt-1 text-sm text-gray-500">{member.ext}</p>
						{/if}
						{#if member.email}
							<a href="mailto:{member.email}" class="mt-1 text-sm text-gray-500 hover:text-orange-600">{member.email}</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Environment -->
<section class="bg-[#f8f5f2] py-16" id="companyevn">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="公司環境" />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each about.environment.images as img (img)}
				<div class="overflow-hidden rounded-lg">
					<img src={asset(img)} alt="辦公環境照片" class="h-48 w-full object-cover" />
					<p class="mt-2 text-center text-sm text-gray-600">辦公環境照片</p>
				</div>
			{/each}
		</div>
		<p class="mt-8 text-center font-bold text-gray-800">{about.environment.caption}</p>
	</div>
</section>

<!-- CTA -->
<section class="py-16 text-center">
	<img src={asset('graphic.png', true)} alt="" class="mx-auto mb-6 h-24 w-auto" />
	<a href={resolve('/contact')} class="text-lg font-bold text-orange-600 hover:underline">聯絡我們 |</a>
</section>
