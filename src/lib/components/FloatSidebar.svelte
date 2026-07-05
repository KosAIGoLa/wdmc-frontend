<script lang="ts">
	import { site, asset } from '$lib/data/site';
	import { t } from '$lib/i18n';
</script>

<aside class="fixed top-1/2 right-4 z-40 hidden w-32 -translate-y-1/2 flex-col gap-5 md:flex">
	{#each [
		{ href: site.youtube, key: 'float.youtube', icon: 'float-icon1.png', hoverBorder: 'hover:border-red-500 hover:shadow-red-500/20', hoverText: 'hover:text-red-500' },
		{ href: site.facebook, key: 'float.facebook', icon: 'float-icon2.png', hoverBorder: 'hover:border-[#3c5a98] hover:shadow-[#3c5a98]/20', hoverText: 'hover:text-[#3c5a98]' },
		{ href: site.line, key: 'float.line', icon: 'float-icon3.png', hoverBorder: 'hover:border-[#00b900] hover:shadow-[#00b900]/20', hoverText: 'hover:text-[#00b900]' }
	] as link (link.href)}
		<div class="rounded-full border border-black/20 bg-white text-sm shadow-[0_6px_18px_rgba(0,0,0,0.16)] transition duration-200 ease-out {link.hoverBorder} hover:-translate-x-1 hover:shadow-lg">
			<a
				href={link.href}
				target="_blank"
				rel="noopener external"
				class="flex items-center justify-center gap-2 px-3 py-2 text-black no-underline transition {link.hoverText}"
			>
				<img src={asset(link.icon, true)} alt="" class="h-[22px] w-[22px] flex-shrink-0" />
				<span class="whitespace-nowrap leading-none">{$t(link.key)}</span>
			</a>
		</div>
	{/each}
</aside>
