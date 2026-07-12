<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { navItems, asset } from '$lib/data/site';
	import type { NavItem } from '$lib/data/site';
	import { t, content } from '$lib/i18n';
	import { slide } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { tick } from 'svelte';

	/** Route paths used by primary navigation (satisfies resolve() typing). */
	type NavPath =
		| '/'
		| '/about'
		| '/news'
		| '/wdmc'
		| '/opening'
		| '/active'
		| '/activity'
		| '/kids'
		| '/talent'
		| '/community'
		| '/contact'
		| '/staff'
		| '/#services';

	let mobileOpen = $state(false);
	let servicesOpen = $state(false);
	let timer: ReturnType<typeof setTimeout>;
	let servicesTrigger: HTMLElement | undefined = $state();
	let menuPos = $state({ top: 0, left: 0 });

	const servicesItem = navItems.find((item) => item.children?.length);

	/** Mount node on document.body so header VT / stacking never clips the menu. */
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	function asNavPath(path: string): NavPath {
		return path as NavPath;
	}

	function positionServicesMenu() {
		if (!servicesTrigger) return;
		const rect = servicesTrigger.getBoundingClientRect();
		menuPos = {
			top: rect.bottom + 4,
			left: rect.left + rect.width / 2
		};
	}

	async function openServices() {
		clearTimeout(timer);
		servicesOpen = true;
		await tick();
		positionServicesMenu();
	}
	function closeServices() {
		timer = setTimeout(() => (servicesOpen = false), 180);
	}
	function keepServicesOpen() {
		clearTimeout(timer);
		servicesOpen = true;
		positionServicesMenu();
	}
	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === resolve('/');
		if (href.startsWith('/#')) return false;
		const pathOnly = href.split('#')[0];
		const target = resolve(asNavPath(pathOnly));
		return page.url.pathname === target || page.url.pathname.startsWith(`${target}/`);
	}
	function isParentActive(item: NavItem): boolean {
		return item.children?.some((child) => isActive(child.href)) ?? false;
	}

	afterNavigate(() => {
		mobileOpen = false;
		servicesOpen = false;
	});
</script>

<svelte:window
	onscroll={() => {
		if (servicesOpen) positionServicesMenu();
	}}
	onresize={() => {
		if (servicesOpen) positionServicesMenu();
	}}
/>

<header
	class="relative border-b border-black/[0.04] bg-white shadow-[0_1px_0_rgba(17,24,39,0.04)] transition-shadow duration-300"
>
	<div
		class="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8 lg:py-4 xl:px-12"
	>
		<a
			href={resolve('/')}
			class="flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
		>
			<img
				src={asset('logo.png', true)}
				alt={$content?.site.name ?? $t('site.name')}
				class="h-auto w-[128px] transition duration-300 hover:scale-[1.02] sm:w-[148px] lg:w-[168px] xl:w-[190px]"
			/>
		</a>

		<!-- Desktop nav -->
		<nav
			class="hidden min-w-0 flex-1 items-center justify-end gap-x-4 text-[14.5px] leading-none xl:gap-x-5 xl:text-[15px] 2xl:gap-x-6 2xl:text-[15.5px] lg:flex"
			aria-label="Primary"
		>
			{#each navItems as item (item.href)}
				{#if item.children}
					<div
						class="relative"
						role="group"
						onmouseenter={openServices}
						onmouseleave={closeServices}
					>
						<button
							type="button"
							bind:this={servicesTrigger}
							class="relative flex items-center gap-0.5 whitespace-nowrap py-2.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#E5554A] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isParentActive(
								item
							)
								? 'font-semibold text-[#E5554A] after:scale-x-100'
								: 'text-[#302D2C] hover:text-[#E5554A]'}"
							aria-expanded={servicesOpen}
							aria-haspopup="true"
						>
							{#if isParentActive(item)}
								<span class="mr-1 text-[10px]" aria-hidden="true">●</span>
							{/if}
							{$t('nav.' + item.key)}
							<svg
								class="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 {servicesOpen
									? 'rotate-180'
									: ''}"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
					</div>
				{:else}
					<a
						href={resolve(asNavPath(item.href))}
						class="relative whitespace-nowrap py-2.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#E5554A] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isActive(
							item.href
						)
							? 'font-semibold text-[#E5554A] after:scale-x-100'
							: 'text-[#302D2C] hover:text-[#E5554A]'}"
					>
						{#if isActive(item.href)}
							<span class="mr-1 text-[10px]" aria-hidden="true">●</span>
						{/if}
						{$t('nav.' + item.key)}
					</a>
				{/if}
			{/each}
		</nav>

		<!-- Mobile toggle -->
		<button
			type="button"
			class="rounded-full p-2.5 text-[#302D2C] transition hover:bg-orange-50 hover:text-[#E5554A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 lg:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
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
			transition:slide={{ duration: 260, easing: (t) => 1 - Math.pow(1 - t, 3) }}
			class="border-t border-[#DFE7E9] bg-white px-3 pb-4 pt-1 lg:hidden"
			aria-label="Mobile"
		>
			{#each navItems as item (item.href)}
				{#if item.children}
					<div class="py-0.5">
						<button
							type="button"
							class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] transition {isParentActive(
								item
							)
								? 'bg-orange-50 font-semibold text-[#E5554A]'
								: 'text-[#302D2C] hover:bg-orange-50 hover:text-[#E5554A]'}"
							onclick={() => (servicesOpen = !servicesOpen)}
							aria-expanded={servicesOpen}
						>
							<span class="flex items-center">
								{#if isParentActive(item)}
									<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
								{/if}
								{$t('nav.' + item.key)}
							</span>
							<svg
								class="h-4 w-4 transition-transform duration-200 {servicesOpen ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if servicesOpen}
							<div transition:slide={{ duration: 200 }} class="ml-2 border-l border-orange-100 pl-2">
								{#each item.children as child (child.href)}
									<a
										href={resolve(asNavPath(child.href))}
										class="block rounded-xl px-3 py-2.5 text-[14.5px] transition hover:bg-orange-50 hover:text-[#E5554A] {isActive(
											child.href
										)
											? 'font-semibold text-[#E5554A]'
											: 'text-[#302D2C]'}"
										onclick={() => (mobileOpen = false)}
									>
										{#if isActive(child.href)}
											<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
										{/if}
										{$t('nav.' + child.key)}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<a
						href={resolve(asNavPath(item.href))}
						class="block rounded-xl px-3 py-3 text-[15px] transition {isActive(item.href)
							? 'bg-orange-50 font-semibold text-[#E5554A]'
							: 'text-[#302D2C] hover:bg-orange-50 hover:text-[#E5554A]'}"
						onclick={() => (mobileOpen = false)}
					>
						{#if isActive(item.href)}
							<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
						{/if}
						{$t('nav.' + item.key)}
					</a>
				{/if}
			{/each}
		</nav>
	{/if}
</header>

<!--
  Body portal + fixed: fully escapes sticky header stacking / view-transition clipping.
-->
{#if servicesOpen && servicesItem?.children}
	<div
		use:portal
		class="services-dropdown fixed z-[300] min-w-[200px] -translate-x-1/2"
		style:top="{menuPos.top}px"
		style:left="{menuPos.left}px"
		role="menu"
		tabindex="-1"
		onmouseenter={keepServicesOpen}
		onmouseleave={closeServices}
	>
		<div
			class="services-menu relative rounded-xl border border-black/[0.06] bg-white px-2 py-2 shadow-[0_16px_40px_rgba(17,24,39,0.14)]"
		>
			<span class="services-tail" aria-hidden="true"></span>
			{#each servicesItem.children as child (child.href)}
				<a
					href={resolve(asNavPath(child.href))}
					role="menuitem"
					class="relative z-10 block whitespace-nowrap rounded-lg px-3.5 py-2.5 text-[14.5px] transition hover:bg-orange-50 hover:text-[#E5554A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 {isActive(
						child.href
					)
						? 'bg-orange-50 font-semibold text-[#E5554A]'
						: 'text-[#302D2C]'}"
				>
					{#if isActive(child.href)}
						<span class="mr-1 text-[10px]" aria-hidden="true">●</span>
					{/if}
					{$t('nav.' + child.key)}
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	/*
	 * Caret sits on the panel top edge.
	 * White notch erases the border line under the tip.
	 */
	.services-menu {
		overflow: visible;
	}

	.services-tail,
	.services-tail::before {
		pointer-events: none;
		position: absolute;
		left: 50%;
		box-sizing: border-box;
	}

	.services-tail {
		top: -1px;
		z-index: 3;
		width: 14px;
		height: 3px;
		transform: translateX(-50%);
		background: #fff;
	}

	.services-tail::before {
		content: '';
		top: -4px;
		z-index: 2;
		width: 10px;
		height: 10px;
		transform: translateX(-50%) rotate(45deg);
		background: #fff;
		border-left: 1px solid rgba(0, 0, 0, 0.08);
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: -1px -1px 2px rgba(17, 24, 39, 0.03);
	}
</style>
