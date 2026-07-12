<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { t, content, tAny } from '$lib/i18n';
	import { contact, site, asset } from '$lib/data/site';

	let agreed = $state(false);
	const c = $derived($content);
	const terms = $derived.by(() => {
		const value = $tAny('pages.contact.terms');
		return Array.isArray(value) ? (value as string[]) : [];
	});

	function channelValues(key: string): string[] {
		if (!c) return [];
		if (key === 'phone') return [site.phone, site.phone2];
		if (key === 'address') return [c.site.address];
		if (key === 'email') return [site.email];
		if (key === 'line') return [...(c.contact.channels.line.values ?? [])];
		return [];
	}
</script>

<svelte:head>
	<title>{$t('nav.contact')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.contact.metaDescription')} />
</svelte:head>

{#if c}
	<PageBanner src={contact.banner.src} alt={c.contact.bannerAlt} />

	<section class="section">
		<div class="container-page">
			<SectionTitle title={$t('pages.contact.sectionTitle')} />

			<div class="grid gap-8 lg:grid-cols-2">
				<div class="grid gap-5 sm:grid-cols-2">
					{#each contact.channels as channel (channel.key)}
						{@const ch = c.contact.channels[channel.key as keyof typeof c.contact.channels]}
						<div class="card group p-6 text-center">
							<img
								src={asset(channel.icon, channel.local)}
								alt={ch.title}
								class="mx-auto h-16 w-16 transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
							/>
							<p class="mt-2 text-xs font-bold text-gray-400">{ch.label}</p>
							<h3
								class="mt-1 font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)]"
							>
								{ch.title}
							</h3>
							<div class="mt-2 space-y-1 text-sm text-gray-600">
								{#each channelValues(channel.key) as value (value)}
									{#if channel.mailto}
										<a
											href="mailto:{value}"
											class="block transition hover:text-[var(--color-brand)] hover:underline"
											>{value}</a
										>
									{:else}
										<p>{value}</p>
									{/if}
								{/each}
							</div>
							{#if channel.hasMap}
								<a
									href={site.maps}
									target="_blank"
									rel="noopener external"
									class="btn-outline mt-3 px-4 py-1.5 text-sm"
								>
									{c.contact.channels.address.map}
								</a>
							{/if}
							{#if channel.hasLine}
								<a
									href={site.line}
									target="_blank"
									rel="noopener external"
									class="btn-outline mt-3 px-4 py-1.5 text-sm"
								>
									{c.contact.channels.line.addFriend}
								</a>
							{/if}
						</div>
					{/each}
				</div>

				<div class="card p-6">
					<p class="mb-4 text-sm text-gray-600">
						{$t('pages.contact.facebookHint')}
						<a
							href={site.facebook}
							target="_blank"
							rel="noopener external"
							class="font-bold text-[var(--color-brand)] transition hover:underline"
							>{$t('pages.contact.facebook')}</a
						>
					</p>
					<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700"
								>{$t('pages.contact.formName')}</label
							>
							<input
								id="name"
								type="text"
								class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700"
								>{$t('pages.contact.formEmail')}</label
							>
							<input
								id="email"
								type="email"
								class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
							/>
						</div>
						<div>
							<label for="phone" class="block text-sm font-medium text-gray-700"
								>{$t('pages.contact.formPhone')}</label
							>
							<input
								id="phone"
								type="tel"
								class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
							/>
						</div>
						<div>
							<label for="message" class="block text-sm font-medium text-gray-700"
								>{$t('pages.contact.formMessage')}</label
							>
							<textarea
								id="message"
								rows="4"
								class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
							></textarea>
						</div>
						<label class="flex items-start gap-2 text-sm text-gray-600">
							<input type="checkbox" bind:checked={agreed} class="mt-1" />
							<span>{$t('pages.contact.formAgree')}</span>
						</label>
						<button type="submit" disabled={!agreed} class="btn-primary w-full disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none">
							{$t('pages.contact.formSubmit')}
						</button>
					</form>
				</div>
			</div>

			<div class="card mt-12 p-6">
				<h2 class="text-xl font-bold text-gray-900">{$t('pages.contact.termsTitle')}</h2>
				<img src={asset('deco.png', true)} alt="" class="mt-2 h-4 w-auto" aria-hidden="true" />
				<ol class="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-600">
					{#each terms as term, index (index)}
						<li>{term}</li>
					{/each}
				</ol>
			</div>
		</div>
	</section>
{/if}
