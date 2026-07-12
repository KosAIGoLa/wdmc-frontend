<script lang="ts">
	import { site, asset } from '$lib/data/site';
	import { t } from '$lib/i18n';
</script>

<aside
	class="pointer-events-none fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-4"
	aria-label="Social links"
>
	{#each [
		{
			href: site.youtube,
			key: 'float.youtube',
			icon: 'float-icon1.png',
			hoverBorder: 'hover:border-red-500 hover:shadow-red-500/20',
			hoverText: 'hover:text-red-500'
		},
		{
			href: site.facebook,
			key: 'float.facebook',
			icon: 'float-icon2.png',
			hoverBorder: 'hover:border-[#3c5a98] hover:shadow-[#3c5a98]/20',
			hoverText: 'hover:text-[#3c5a98]'
		},
		{
			href: site.line,
			key: 'float.line',
			icon: 'float-icon3.png',
			hoverBorder: 'hover:border-[#00b900] hover:shadow-[#00b900]/20',
			hoverText: 'hover:text-[#00b900]'
		}
	] as link (link.href)}
		<div
			class="pointer-events-auto rounded-full border border-[var(--color-line-strong)] bg-[color-mix(in_srgb,var(--color-panel)_92%,transparent)] text-[13px] shadow-[var(--shadow-float)] backdrop-blur-sm transition duration-200 ease-out {link.hoverBorder} hover:-translate-x-1.5 hover:shadow-lg"
		>
			<a
				href={link.href}
				target="_blank"
				rel="noopener external"
				class="flex items-center gap-2 px-3.5 py-2.5 text-[var(--color-ink)] no-underline transition {link.hoverText}"
			>
				<img
					src={asset(link.icon, true)}
					alt=""
					class="h-[20px] w-[20px] shrink-0"
					aria-hidden="true"
				/>
				<span class="whitespace-nowrap leading-none tracking-wide">{$t(link.key)}</span>
			</a>
		</div>
	{/each}
</aside>
