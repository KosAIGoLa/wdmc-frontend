<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { resolve } from '$app/paths';
	import { t, content } from '$lib/i18n';
	import { about, asset } from '$lib/data/site';

	const c = $derived($content);
</script>

<svelte:head>
	<title>{$t('nav.about')} | {$t('site.name')}</title>
	<meta name="description" content={c?.about.intro ?? $t('site.tagline')} />
</svelte:head>

{#if c}
	<PageBanner src={about.banner.src} alt={c.about.bannerAlt} />

	<!-- Features -->
	<section class="section">
		<div class="container-page">
			<SectionTitle
				title={$t('pages.about.featuresTitle')}
				subtitle={$t('pages.about.featuresSubtitle')}
			/>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
				{#each about.features as feature, i (i)}
					{@const f = c.about.features[i]}
					<div
						class="group relative overflow-hidden rounded-2xl border border-black/[0.04] bg-white px-5 py-8 text-center shadow-[0_6px_24px_rgba(17,24,39,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand)]/20 hover:shadow-[0_14px_34px_rgba(229,85,74,0.12)]"
					>
						<div
							class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] ring-1 ring-black/[0.03] transition duration-300 group-hover:bg-orange-50 group-hover:ring-orange-100"
						>
							<img
								src={asset(feature.icon)}
								alt={f?.title}
								class="h-12 w-12 object-contain transition duration-300 group-hover:scale-110"
							/>
						</div>
						<h3
							class="mt-5 text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[var(--color-brand)]"
						>
							{f?.title}
						</h3>
						<p class="mt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
							{(f?.en ?? []).join(' ')}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Intro -->
	<section class="section section-soft">
		<div class="container-page max-w-3xl text-center">
			<SectionTitle title={$t('pages.about.sectionTitle')} />
			<p class="text-[15px] leading-[1.85] text-gray-600 sm:text-base">
				{c.about.intro}
			</p>
		</div>
	</section>

	<!-- Team -->
	<section class="section">
		<div class="container-page">
			<SectionTitle
				title={$t('pages.about.teamTitle')}
				subtitle={$t('pages.about.teamSubtitle')}
			/>
			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
				{#each about.team as member, i (i)}
					{@const m = c.about.team[i]}
					<article
						class="team-card group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-[0_6px_22px_rgba(17,24,39,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(17,24,39,0.1)]"
					>
						<div class="media-frame media-frame--portrait relative aspect-[4/5]">
							<img src={asset(member.image)} alt={m?.name} loading="lazy" />
							{#if m?.role}
								<span
									class="absolute bottom-3 left-3 z-[3] rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wide text-[var(--color-brand)] shadow-sm backdrop-blur-sm"
								>
									{m.role}
								</span>
							{/if}
						</div>

						<div class="flex flex-1 flex-col px-4 pb-4 pt-3.5">
							<div class="min-h-[3.25rem]">
								<h3 class="text-base font-bold tracking-tight text-gray-900">
									{m?.name}
								</h3>
								{#if m?.en}
									<p class="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
										{m.en}
									</p>
								{/if}
							</div>

							{#if m?.edu}
								<p
									class="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-gray-500"
									title={m.edu}
								>
									{m.edu}
								</p>
							{:else}
								<div class="mt-2 min-h-[2.4rem]" aria-hidden="true"></div>
							{/if}

							{#if member.ext || member.email}
								<div
									class="mt-auto flex flex-col gap-1 border-t border-black/[0.05] pt-3 text-[12px] text-gray-500"
								>
									{#if member.ext}
										<p class="flex items-center gap-1.5 truncate">
											<svg
												class="h-3.5 w-3.5 shrink-0 text-gray-400"
												fill="none"
												stroke="currentColor"
												stroke-width="1.8"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
												/>
											</svg>
											<span class="truncate">{member.ext}</span>
										</p>
									{/if}
									{#if member.email}
										<a
											href="mailto:{member.email}"
											class="flex items-center gap-1.5 truncate transition hover:text-[var(--color-brand)]"
										>
											<svg
												class="h-3.5 w-3.5 shrink-0 text-gray-400"
												fill="none"
												stroke="currentColor"
												stroke-width="1.8"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
												/>
											</svg>
											<span class="truncate">{member.email}</span>
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Environment -->
	<section class="section section-soft" id="companyevn">
		<div class="container-page">
			<SectionTitle title={$t('pages.about.envTitle')} subtitle={$t('pages.about.envSubtitle')} />
			<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
				{#each about.environment.images as img, index (img)}
					<figure class="media-frame media-frame--lift group aspect-[4/3] rounded-xl">
						<img
							src={asset(img)}
							alt="{$t('pages.about.photoCaption')} {index + 1}"
							loading="lazy"
						/>
					</figure>
				{/each}
			</div>
			<p
				class="mx-auto mt-10 max-w-3xl text-center text-[15px] font-medium leading-relaxed text-gray-700 sm:text-base"
			>
				{c.about.envCaption}
			</p>
		</div>
	</section>

	<!-- CTA -->
	<section class="section text-center">
		<img
			src={asset('graphic.png', true)}
			alt=""
			class="mx-auto mb-6 h-24 w-auto transition hover:scale-105"
		/>
		<a href={resolve('/contact')} class="btn-outline text-base sm:text-lg">{$t('pages.about.cta')}</a
		>
	</section>
{/if}

<style>
	/* Keep team cards visually even even when contact rows differ */
	.team-card {
		min-height: 100%;
	}
</style>
