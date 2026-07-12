<script lang="ts">
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { t, content } from '$lib/i18n';
	import { staff, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.staff')} | {$t('site.name')}</title>
	<meta name="description" content={c?.staff.description ?? ''} />
</svelte:head>

{#if c}
	<PageBanner src={staff.banner.src} alt={c.staff.bannerAlt} />

	<section class="section">
		<div class="container-page max-w-4xl text-center">
			<h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
				{c.staff.title}{$t('pages.staff.sectionTitleSuffix')}
			</h1>
			<p class="mt-3 text-lg font-medium text-[var(--color-brand)]">{c.staff.planTitle}</p>
			<img
				src={asset('graphic.png', true)}
				alt=""
				class="mx-auto mt-8 h-24 w-auto transition hover:scale-105"
			/>
			<p class="mx-auto mt-6 max-w-3xl leading-relaxed text-gray-600">{c.staff.description}</p>
			<a
				href={staff.form}
				target="_blank"
				rel="noopener external"
				class="btn-primary mt-8"
			>
				{$t('pages.staff.joinBtn')}
			</a>
		</div>
	</section>
{/if}
