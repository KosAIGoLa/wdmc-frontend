<script lang="ts">
	import BannerCarousel from '$lib/components/BannerCarousel.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import { news, asset } from '$lib/data/site';

	const pageSize = 12;
	let currentPage = $state(1);
	const totalPages = $derived(Math.ceil(news.items.length / pageSize));
	const visibleItems = $derived(
		news.items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);

	function setPage(page: number) {
		currentPage = Math.min(Math.max(page, 1), totalPages);
	}
</script>

<svelte:head>
	<title>{$t('nav.news')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.news.metaDescription')} />
</svelte:head>

<BannerCarousel banners={news.banners} />

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="LATEST NEWS" />
		<div class="grid gap-6 md:grid-cols-2">
			{#each visibleItems as item (item.id)}
				<article
					class="group min-h-[214px] rounded-[18px] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.08)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(17,24,39,0.16)]"
				>
					<div class="flex h-full gap-5">
						<a
							href={resolve(`/news/${item.id}`)}
							class="block h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-[126px] sm:w-[126px]"
						>
							<img
								src={asset(item.image)}
								alt={item.title}
								class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
							/>
						</a>
						<div class="flex min-w-0 flex-1 flex-col">
							<div class="flex items-start justify-between gap-4">
								<h3 class="line-clamp-2 text-xl font-black leading-tight text-[#2b2b2b]">
									{item.title}
								</h3>
								<p class="shrink-0 pt-1 text-sm font-medium text-[#a2a9af]">{item.year}</p>
							</div>
							<p class="mt-3 line-clamp-3 text-base font-semibold leading-relaxed text-[#81909a]">
								{item.desc}
							</p>
							<a
								href={resolve(`/news/${item.id}`)}
								class="mt-auto flex items-center justify-end gap-3 pt-5 text-sm font-black text-[#2f2f2f] transition hover:text-[#ffa72a]"
							>
								<span>SEE MORE</span>
								<span
									class="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffa72a] text-white shadow-[0_6px_14px_rgba(255,167,42,0.26)] transition duration-300 group-hover:translate-x-1 group-hover:scale-105"
									aria-hidden="true"
								>
									<svg
										class="h-4 w-4"
										fill="none"
										stroke="currentColor"
										stroke-width="2.6"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M5 12h14m-6-6 6 6-6 6"
										/>
									</svg>
								</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<nav class="mt-10 flex items-center justify-center gap-2" aria-label="News pagination">
			<button
				type="button"
				onclick={() => setPage(currentPage - 1)}
				disabled={currentPage === 1}
				class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-700 transition hover:-translate-y-0.5 hover:border-orange-600 hover:text-orange-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-40"
				aria-label="Previous page"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<div class="flex max-w-full flex-wrap justify-center gap-2">
				{#each Array.from({ length: totalPages }, (_, index) => index + 1) as page (page)}
					<button
						type="button"
						onclick={() => setPage(page)}
						class="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 {page ===
						currentPage
							? 'border-orange-600 bg-orange-600 text-white'
							: 'border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600'}"
						aria-current={page === currentPage ? 'page' : undefined}
					>
						{page}
					</button>
				{/each}
			</div>
			<button
				type="button"
				onclick={() => setPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-700 transition hover:-translate-y-0.5 hover:border-orange-600 hover:text-orange-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-40"
				aria-label="Next page"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</nav>
	</div>
</section>
