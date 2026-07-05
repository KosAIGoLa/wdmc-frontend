<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import ClipCard from '$lib/components/ClipCard.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { home, asset } from '$lib/data/site';
</script>

<svelte:head>
	<title>{$t('site.name')}</title>
	<meta name="description" content={$t('site.tagline')} />
</svelte:head>

<!-- Banner -->
<BannerCarousel banners={home.banners} />

<!-- Brands -->
<section class="bg-[#f8f5f2] py-12" id="services">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.home.brandsTitle')} subtitle="Event integrated marketing" />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each home.brands as brand (brand.href)}
				<a
					href={brand.href}
					class="group flex flex-col items-center rounded-lg bg-white p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
				>
					<h3 class="text-lg font-bold text-gray-800 transition-colors group-hover:text-orange-600">
						{brand.name}
					</h3>
					<p class="mt-1 text-xs uppercase tracking-wider text-gray-500">{brand.en}</p>
					<img
						src={asset(brand.logo)}
						alt={brand.name}
						class="mt-4 h-20 w-20 rounded-full object-cover transition duration-500 ease-out group-hover:scale-110"
					/>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Intro -->
<section class="py-16">
	<div class="mx-auto max-w-4xl px-4 text-center">
		<h1 class="text-3xl font-bold text-gray-800 md:text-4xl">{home.intro.title}</h1>
		<p class="mt-3 text-lg font-medium text-orange-600">{home.intro.subtitle}</p>
		<img src={asset('index-deco4.png')} alt="" class="mx-auto mt-6 h-16 w-auto" />
		<p class="mt-6 leading-relaxed text-gray-600">{home.intro.description}</p>
		<p class="mt-2 text-sm uppercase tracking-widest text-gray-400">{home.intro.enTitle}</p>
	</div>
</section>

<!-- Marketing -->
<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={home.marketing.title} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each home.marketing.items as item (item.label)}
				<IconCard icon={item.icon} label={item.label} />
			{/each}
		</div>
		<div class="mt-10 flex justify-center">
			<a
				href={resolve('/wdmc')}
				class="rounded-full border border-orange-600 px-5 py-2 text-sm font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				>{$t('pages.home.more')}</a
			>
		</div>
		<div
			class="mt-8 overflow-hidden rounded-xl shadow-sm transition duration-300 hover:shadow-[0_16px_34px_rgba(17,24,39,0.14)]"
		>
			<img
				src={home.marketing.overlay.src}
				alt={home.marketing.overlay.alt}
				class="h-auto w-full object-cover transition duration-700 ease-out hover:scale-[1.03]"
			/>
		</div>
	</div>
</section>

<!-- Featured activities -->
<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row">
			<img src={asset('index-deco2.png')} alt="" class="h-16 w-auto transition hover:scale-105" />
			<a
				href={resolve('/wdmc#act-item')}
				class="rounded-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
			>
				<img src={asset('index-deco3.png')} alt="" class="h-16 w-auto" />
			</a>
		</div>
		<SectionTitle title={home.featured.title} />
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each home.featured.items as item (item.title)}
				<ActivityCard href={item.href} src={item.src} title={item.title} />
			{/each}
		</div>
	</div>
</section>

<!-- Media -->
<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-8 text-center">
			<h2 class="text-3xl font-bold text-gray-800">{home.media.title}</h2>
			<p class="mt-2 text-sm font-medium text-orange-600">{home.media.subtitle}</p>
			<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		</div>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each home.media.items as item (item.label)}
				<IconCard icon={item.icon} label={item.label} />
			{/each}
		</div>
	</div>
</section>

<!-- Kids -->
<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-8 text-center">
			<h2 class="text-3xl font-bold text-gray-800">{home.kids.title}</h2>
			<p class="mt-2 text-sm font-medium text-orange-600">{home.kids.subtitle}</p>
			<img src={asset('deco.png', true)} alt="" class="mx-auto mt-4 h-4 w-auto" />
		</div>
		<div class="grid items-center gap-8 md:grid-cols-2">
			<div class="space-y-4 text-center md:text-left">
				<h3 class="text-xl font-bold text-gray-800">{home.kids.brand}</h3>
				<ul class="space-y-2 text-gray-600">
					{#each home.kids.courses as course (course)}
						<li>{course}</li>
					{/each}
				</ul>
				<a
					href={home.kids.booking}
					target="_blank"
					rel="noopener external"
					class="inline-block rounded-full border border-orange-600 px-5 py-2 text-sm font-bold text-orange-600 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				>
					{$t('pages.home.bookingBtn')}
				</a>
			</div>
			<div
				class="overflow-hidden rounded-lg shadow-sm transition duration-300 hover:shadow-[0_16px_34px_rgba(17,24,39,0.14)]"
			>
				<img
					src={home.kids.image.src}
					alt={home.kids.image.alt}
					class="transition duration-700 ease-out hover:scale-[1.03]"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Clips -->
<section class="bg-[#f8f5f2] py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={home.clips.title} />
		<div class="grid overflow-hidden md:grid-cols-2">
			{#each home.clips.items as clip, index (clip.title)}
				<ClipCard src={clip.src} year={clip.year} title={clip.title} desc={clip.desc} {index} />
			{/each}
		</div>
	</div>
</section>
