<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import ClipCard from '$lib/components/ClipCard.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { home, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{c?.site.name ?? $t('site.name')}</title>
	<meta name="description" content={c?.site.tagline ?? $t('site.tagline')} />
</svelte:head>

{#if c}
	<!-- Banner -->
	<BannerCarousel
		banners={home.banners.map((b, i) => ({
			src: b.src,
			alt: c.home.banners[i] ?? ''
		}))}
	/>

	<!-- Brands -->
	<section class="section section-soft" id="services">
		<div class="container-page">
			<SectionTitle title={$t('pages.home.brandsTitle')} subtitle={$t('pages.home.brandsSubtitle')} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
				{#each home.brands as brand, i (brand.href)}
					<a
						href={resolve(brand.href as '/wdmc' | '/activity' | '/kids' | '/talent')}
						class="card group flex flex-col items-center p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
					>
						<h3 class="text-lg font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)]">
							{c.home.brands[i]?.name}
						</h3>
						<p class="mt-1 text-xs uppercase tracking-wider text-gray-500">
							{c.home.brands[i]?.en}
						</p>
						<div
							class="media-frame mt-5 h-20 w-20 rounded-full ring-4 ring-[var(--color-surface-soft)]"
						>
							<img src={asset(brand.logo)} alt={c.home.brands[i]?.name} />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Intro -->
	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
				{c.home.intro.title}
			</h1>
			<p class="mt-3 text-base font-medium text-[var(--color-brand)] sm:text-lg">
				{c.home.intro.subtitle}
			</p>
			<img
				src={asset('index-deco4.png')}
				alt=""
				class="mx-auto mt-5 h-14 w-auto sm:mt-6 sm:h-16"
				aria-hidden="true"
			/>
			<p class="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-gray-600 sm:mt-6 sm:text-base">
				{c.home.intro.description}
			</p>
			<p class="mt-3 text-xs uppercase tracking-[0.2em] text-gray-400 sm:text-sm">
				{c.home.intro.enTitle}
			</p>
		</div>
	</section>

	<!-- Marketing -->
	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={c.home.marketing.title} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.marketing.items as item, i (i)}
					<IconCard icon={item.icon} label={c.home.marketing.items[i] ?? ''} />
				{/each}
			</div>
			<div class="mt-10 flex justify-center">
				<a href={resolve('/wdmc')} class="btn-outline">{$t('pages.home.more')}</a>
			</div>
			<div class="card group mt-8 overflow-hidden p-0">
				<div class="media-frame media-frame--soft">
					<img src={home.marketing.overlay.src} alt={c.home.marketing.overlayAlt} />
				</div>
			</div>
		</div>
	</section>

	<!-- Featured -->
	<section class="section">
		<div class="container-page">
			<div class="mb-8 flex flex-col items-center justify-center gap-4 sm:mb-10 md:flex-row">
				<img
					src={asset('index-deco2.png')}
					alt=""
					class="h-14 w-auto transition hover:scale-105 sm:h-16"
					aria-hidden="true"
				/>
				<a
					href={resolve('/wdmc#act-item')}
					class="rounded-sm transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				>
					<img src={asset('index-deco3.png')} alt="" class="h-14 w-auto sm:h-16" />
				</a>
			</div>
			<SectionTitle title={c.home.featured.title} />
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.featured.items as item, i (i)}
					<ActivityCard
						href={item.href}
						src={item.src}
						title={c.home.featured.items[i] ?? ''}
					/>
				{/each}
			</div>
		</div>
	</section>

	<!-- Media -->
	<section class="section section-soft">
		<div class="container-page">
			<div class="mb-8 text-center sm:mb-10">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">{c.home.media.title}</h2>
				<p class="mt-2 text-sm font-medium text-[var(--color-brand)]">{c.home.media.subtitle}</p>
				<img
					src={asset('deco.png', true)}
					alt=""
					class="mx-auto mt-4 h-3.5 w-auto sm:h-4"
					aria-hidden="true"
				/>
			</div>
			<div class="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
				{#each home.media.items as item, i (i)}
					<IconCard icon={item.icon} label={c.home.media.items[i] ?? ''} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Kids -->
	<section class="section">
		<div class="container-page">
			<div class="mb-8 text-center sm:mb-10">
				<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">{c.home.kids.title}</h2>
				<p class="mt-2 text-sm font-medium text-[var(--color-brand)]">{c.home.kids.subtitle}</p>
				<img
					src={asset('deco.png', true)}
					alt=""
					class="mx-auto mt-4 h-3.5 w-auto sm:h-4"
					aria-hidden="true"
				/>
			</div>
			<div class="grid items-center gap-8 md:grid-cols-2 md:gap-10">
				<div class="space-y-4 text-center md:text-left">
					<h3 class="text-xl font-bold text-gray-900">{c.home.kids.brand}</h3>
					<ul class="space-y-2 text-gray-600">
						{#each c.home.kids.courses as course (course)}
							<li>{course}</li>
						{/each}
					</ul>
					<a
						href={home.kids.booking}
						target="_blank"
						rel="noopener external"
						class="btn-outline"
					>
						{$t('pages.home.bookingBtn')}
					</a>
				</div>
				<div class="card group overflow-hidden p-0">
					<div class="media-frame media-frame--soft">
						<img src={home.kids.image.src} alt={c.home.kids.imageAlt} />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Clips -->
	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={c.home.clips.title} />
			<div class="overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:grid md:grid-cols-2">
				{#each home.clips.items as clip, index (index)}
					{@const text = c.home.clips.items[index]}
					<ClipCard
						src={clip.src}
						year={text?.year ?? ''}
						title={text?.title ?? ''}
						desc={text?.desc ?? ''}
						{index}
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}
