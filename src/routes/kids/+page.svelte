<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import { t, content } from '$lib/i18n';
	import { home, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.kids')} | {$t('site.name')}</title>
	<meta name="description" content={c?.services.kids.description ?? ''} />
</svelte:head>

{#if c}
	<PageBanner src={asset('index-banner1.jpg', true)} alt={c.services.kids.title} />

	<PageIntro
		title={c.services.kids.title}
		subtitle={c.services.kids.subtitle}
		description={c.services.kids.description}
	/>

	<section class="section section-soft">
		<div class="container-page">
			<SectionTitle title={$t('pages.kids.sectionTitle')} />
			<div class="grid gap-5 sm:grid-cols-3">
				{#each c.home.kids.courses as course (course)}
					<div class="card group p-8 text-center">
						<h3
							class="text-xl font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)]"
						>
							{course}
						</h3>
					</div>
				{/each}
			</div>
			<div class="mt-10 text-center">
				<a
					href={home.kids.booking}
					target="_blank"
					rel="noopener external"
					class="btn-primary"
				>
					{$t('pages.kids.bookingBtn')}
				</a>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h2 class="text-2xl font-bold text-gray-900">{$t('pages.kids.brandTitle')}</h2>
			<p class="mt-4 leading-relaxed text-gray-600">{$t('pages.kids.brandDesc')}</p>
			<div class="card group mx-auto mt-8 max-w-2xl overflow-hidden p-0">
				<div class="media-frame media-frame--soft">
					<img src={home.kids.image.src} alt={c.home.kids.imageAlt} />
				</div>
			</div>
		</div>
	</section>
{/if}
