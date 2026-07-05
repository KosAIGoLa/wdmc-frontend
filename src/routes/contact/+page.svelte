<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { t } from '$lib/i18n';
	import { contact, site, asset } from '$lib/data/site';

	let agreed = $state(false);
	const terms = $derived.by(() => {
		const value = $t('pages.contact.terms') as unknown;
		return Array.isArray(value) ? (value as string[]) : [];
	});
</script>

<svelte:head>
	<title>{$t('nav.contact')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.contact.metaDescription') as string} />
</svelte:head>

<PageBanner src={contact.banner.src} alt={contact.banner.alt} />

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title={$t('pages.contact.sectionTitle') as string} />

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Contact channels -->
			<div class="grid gap-6 sm:grid-cols-2">
				{#each contact.channels as channel (channel.title)}
					<div
						class="group rounded-lg bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
					>
						<img
							src={asset(channel.icon, channel.local)}
							alt={channel.title}
							class="mx-auto h-16 w-16 transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
						/>
						<p class="mt-2 text-xs font-bold text-gray-400">{channel.label}</p>
						<h3 class="mt-1 font-bold text-gray-800 transition-colors group-hover:text-orange-600">
							{channel.title}
						</h3>
						<div class="mt-2 space-y-1 text-sm text-gray-600">
							{#each channel.values as value (value)}
								{#if channel.mailto}
									<a
										href="mailto:{value}"
										class="block transition hover:text-orange-600 hover:underline">{value}</a
									>
								{:else}
									<p>{value}</p>
								{/if}
							{/each}
						</div>
						{#if channel.link}
							<a
								href={channel.link.href}
								target="_blank"
								rel="noopener external"
								class="mt-2 inline-block rounded-full border border-orange-600 px-4 py-1.5 text-sm font-bold text-orange-600 transition hover:bg-orange-600 hover:text-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
							>
								{channel.link.label}
							</a>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Form -->
			<div
				class="rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
			>
				<p class="mb-4 text-sm text-gray-600">
					{$t('pages.contact.facebookHint')}
					<a
						href={site.facebook}
						target="_blank"
						rel="noopener external"
						class="font-bold text-orange-600 transition hover:text-orange-700 hover:underline"
						>Facebook</a
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
							class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700"
							>{$t('pages.contact.formEmail')}</label
						>
						<input
							id="email"
							type="email"
							class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
						/>
					</div>
					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700"
							>{$t('pages.contact.formPhone')}</label
						>
						<input
							id="phone"
							type="tel"
							class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
						/>
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700"
							>{$t('pages.contact.formMessage')}</label
						>
						<textarea
							id="message"
							rows="4"
							class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
						></textarea>
					</div>
					<label class="flex items-start gap-2 text-sm text-gray-600">
						<input type="checkbox" bind:checked={agreed} class="mt-1" />
						<span>{$t('pages.contact.formAgree')}</span>
					</label>
					<button
						type="submit"
						disabled={!agreed}
						class="w-full rounded-full bg-orange-600 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none"
					>
						{$t('pages.contact.formSubmit')}
					</button>
				</form>
			</div>
		</div>

		<!-- Terms -->
		<div
			class="mt-12 rounded-lg bg-white p-6 shadow-sm transition duration-300 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
		>
			<h2 class="text-xl font-bold text-gray-800">{$t('pages.contact.termsTitle')}</h2>
			<img src={asset('deco.png', true)} alt="" class="mt-2 h-4 w-auto" />
			<ol class="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-600">
				{#each terms as term, index (index)}
					<li>{term}</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
