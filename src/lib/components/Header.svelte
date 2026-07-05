<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { navItems, site, asset } from '$lib/data/site';
	import type { NavItem } from '$lib/data/site';
	import { t } from '$lib/i18n';
	import { slide } from 'svelte/transition';

	let mobileOpen = $state(false);
	let servicesOpen = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	function openServices() {
		clearTimeout(timer);
		servicesOpen = true;
	}
	function closeServices() {
		timer = setTimeout(() => (servicesOpen = false), 150);
	}
	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		if (href.startsWith('/#')) return false;
		return page.url.pathname.startsWith(href.split('#')[0]);
	}
	function isParentActive(item: NavItem): boolean {
		return item.children?.some((child) => isActive(child.href)) ?? false;
	}
</script>

<header class="sticky top-0 z-50 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
	<div class="flex items-center justify-between px-4 py-4 lg:px-6 lg:py-6 xl:px-[88px]">
		<a
			href={resolve('/')}
			class="flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
		>
			<img
				src={asset('logo.png', true)}
				alt={site.name}
				class="w-[140px] transition duration-300 hover:scale-[1.02] md:w-[160px] lg:w-[200px] xl:w-[240px]"
			/>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-7 lg:flex text-[15.5px]">
			{#each navItems as item (item.href)}
				{#if item.children}
					<div
						class="group relative"
						role="group"
						onmouseenter={openServices}
						onmouseleave={closeServices}
					>
						<button
							class="relative flex items-center gap-1 py-2 text-[15.5px] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#E5554A] after:transition-transform hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isParentActive(
								item
							)
								? 'text-[#E5554A]'
								: 'text-[#302D2C] hover:text-[#E5554A]'}"
						>
							{#if isParentActive(item)}<span class="mr-1.5">•</span>{/if}{$t('nav.' + item.key)}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if servicesOpen}
							<div
								class="absolute left-0 top-full -mt-2 min-w-[200px] rounded-md bg-white px-3 py-2 shadow-[0_14px_30px_rgba(17,24,39,0.14)]"
							>
								{#each item.children as child (child.href)}
									<a
										href={child.href}
										class="block whitespace-nowrap rounded px-3 py-2 text-[15.5px] text-[#302D2C] transition hover:bg-orange-50 hover:text-[#E5554A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 {isActive(
											child.href
										)
											? 'text-[#E5554A]'
											: ''}"
									>
										{#if isActive(child.href)}<span class="mr-1.5">•</span>{/if}{$t(
											'nav.' + child.key
										)}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<a
						href={item.href}
						class="relative py-2 text-[15.5px] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#E5554A] after:transition-transform hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isActive(
							item.href
						)
							? 'text-[#E5554A]'
							: 'text-[#302D2C] hover:text-[#E5554A]'}"
					>
						{#if isActive(item.href)}<span class="mr-1.5">•</span>{/if}{$t('nav.' + item.key)}
					</a>
				{/if}
			{/each}
		</nav>

		<!-- Mobile toggle -->
		<button
			class="rounded-full p-2 text-[#302D2C] transition hover:bg-orange-50 hover:text-[#E5554A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 lg:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				{#if mobileOpen}
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<nav
			transition:slide={{ duration: 300 }}
			class="border-t border-[#DFE7E9] bg-white pl-5 pb-4 lg:hidden"
		>
			{#each navItems as item (item.href)}
				{#if item.children}
					<div class="py-2">
						<button
							class="flex w-full items-center justify-between rounded-l-full px-3 py-2 text-[15.5px] transition {isParentActive(
								item
							)
								? 'text-[#E5554A]'
								: 'text-[#302D2C] hover:bg-orange-50 hover:text-[#E5554A]'}"
							onclick={() => (servicesOpen = !servicesOpen)}
						>
							{#if isParentActive(item)}<span class="mr-1.5">•</span>{/if}{$t('nav.' + item.key)}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if servicesOpen}
							<div transition:slide={{ duration: 200 }}>
								{#each item.children as child (child.href)}
									<a
										href={child.href}
										class="block rounded-l-full px-3 py-2 text-[15.5px] text-[#302D2C] transition hover:bg-orange-50 hover:text-[#E5554A]"
										onclick={() => (mobileOpen = false)}
									>
										{#if isActive(child.href)}<span class="mr-1.5">•</span>{/if}{$t(
											'nav.' + child.key
										)}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<a
						href={item.href}
						class="block rounded-l-full px-3 py-2 text-[15.5px] transition {isActive(item.href)
							? 'text-[#E5554A]'
							: 'text-[#302D2C] hover:bg-orange-50 hover:text-[#E5554A]'}"
						onclick={() => (mobileOpen = false)}
					>
						{#if isActive(item.href)}<span class="mr-1.5">•</span>{/if}{$t('nav.' + item.key)}
					</a>
				{/if}
			{/each}
		</nav>
	{/if}
</header>
