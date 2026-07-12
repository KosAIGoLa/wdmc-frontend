<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { navItems, asset } from '$lib/data/site';
	import type { NavItem } from '$lib/data/site';
	import { t, content } from '$lib/i18n';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/theme';

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
	/** Mobile drawer: inline accordion only (never the floating flyout). */
	let mobileServicesOpen = $state(false);
	/** Desktop hover flyout only (lg+). Completely separate from mobile. */
	let desktopServicesOpen = $state(false);
	/**
	 * Skip drawer CSS transitions when closing for navigation so View Transition
	 * captures a stable header (no mid-collapse height jump / jank).
	 */
	let closeInstant = $state(false);
	let timer: ReturnType<typeof setTimeout>;
	let servicesTrigger: HTMLElement | undefined = $state();
	let menuPos = $state({ top: 0, left: 0 });
	/** Matches Tailwind `lg` — portal must not mount below this width. */
	let isDesktop = $state(false);

	function closeMobileNav(instant = false) {
		if (instant) closeInstant = true;
		mobileOpen = false;
		mobileServicesOpen = false;
		if (instant) {
			// Allow one frame with transitions disabled, then restore for next open
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					closeInstant = false;
				});
			});
		}
	}

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
		if (!servicesTrigger || !isDesktop) return;
		const rect = servicesTrigger.getBoundingClientRect();
		menuPos = {
			top: rect.bottom + 4,
			left: rect.left + rect.width / 2
		};
	}

	async function openDesktopServices() {
		if (!isDesktop) return;
		clearTimeout(timer);
		desktopServicesOpen = true;
		await tick();
		positionServicesMenu();
	}
	function closeDesktopServices() {
		timer = setTimeout(() => (desktopServicesOpen = false), 180);
	}
	function keepDesktopServicesOpen() {
		if (!isDesktop) return;
		clearTimeout(timer);
		desktopServicesOpen = true;
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

	function syncViewport() {
		const next = window.matchMedia('(min-width: 1024px)').matches;
		isDesktop = next;
		if (!next) {
			// Leaving desktop: kill flyout so it never sticks as a "popup" on phones
			desktopServicesOpen = false;
			clearTimeout(timer);
		} else {
			mobileOpen = false;
			mobileServicesOpen = false;
		}
	}

	// Close drawer *before* View Transition snapshots the DOM (avoids tall→short header jump)
	beforeNavigate(({ type, willUnload }) => {
		if (willUnload) return;
		// Keep drawer open only for pure hash/same-doc noise; path changes always snap-close
		if (type === 'leave') return;
		if (mobileOpen || mobileServicesOpen) {
			closeMobileNav(true);
		}
		desktopServicesOpen = false;
	});

	afterNavigate(() => {
		closeMobileNav(true);
		desktopServicesOpen = false;
	});

	onMount(() => {
		syncViewport();
		const mq = window.matchMedia('(min-width: 1024px)');
		const onMq = () => syncViewport();
		mq.addEventListener('change', onMq);
		return () => mq.removeEventListener('change', onMq);
	});
</script>

<svelte:window
	onscroll={() => {
		if (desktopServicesOpen && isDesktop) positionServicesMenu();
	}}
/>

<header
	class="site-header-bar relative border-b border-[var(--color-line)] bg-[var(--color-header-bg)] shadow-[0_1px_0_var(--color-line)] backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] md:backdrop-blur-md"
>
	<!--
	  Only this fixed-height chrome participates in View Transitions.
	  Mobile drawer is excluded so open/close never morphs the header snapshot.
	-->
	<div class="site-header-vt">
	<div
		class="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8 lg:py-4 xl:px-12"
	>
		<a
			href={resolve('/')}
			class="site-logo-link group relative flex shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
		>
			<!-- Light logo (default) -->
			<img
				src={asset('logo.png', true)}
				alt={$content?.site.name ?? $t('site.name')}
				class="site-logo site-logo--light h-auto w-[128px] transition duration-300 group-hover:scale-[1.02] sm:w-[148px] lg:w-[168px] xl:w-[190px]"
				class:site-logo--active={$theme === 'light'}
				class:site-logo--inactive={$theme === 'dark'}
			/>
			<!-- Dark logo (light text, same mark) — crossfades with theme -->
			<img
				src={asset('logo-dark.png', true)}
				alt=""
				aria-hidden="true"
				class="site-logo site-logo--dark pointer-events-none absolute left-0 top-1/2 h-auto w-[128px] -translate-y-1/2 transition duration-300 group-hover:scale-[1.02] sm:w-[148px] lg:w-[168px] xl:w-[190px]"
				class:site-logo--active={$theme === 'dark'}
				class:site-logo--inactive={$theme === 'light'}
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
						onmouseenter={openDesktopServices}
						onmouseleave={closeDesktopServices}
					>
						<button
							type="button"
							bind:this={servicesTrigger}
							class="relative flex items-center gap-0.5 whitespace-nowrap py-2.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-brand)] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isParentActive(
								item
							)
								? 'font-semibold text-[var(--color-brand)] after:scale-x-100'
								: 'text-[var(--color-ink)] hover:text-[var(--color-brand)]'}"
							aria-expanded={desktopServicesOpen}
							aria-haspopup="true"
							onclick={(e) => {
								// Desktop only — never open flyout from a touch/click path on narrow viewports
								if (!isDesktop) {
									e.preventDefault();
									return;
								}
								desktopServicesOpen = !desktopServicesOpen;
								if (desktopServicesOpen) positionServicesMenu();
							}}
						>
							{#if isParentActive(item)}
								<span class="mr-1 text-[10px]" aria-hidden="true">●</span>
							{/if}
							{$t('nav.' + item.key)}
							<svg
								class="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 {desktopServicesOpen
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
						class="relative whitespace-nowrap py-2.5 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-brand)] after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 {isActive(
							item.href
						)
							? 'font-semibold text-[var(--color-brand)] after:scale-x-100'
							: 'text-[var(--color-ink)] hover:text-[var(--color-brand)]'}"
					>
						{#if isActive(item.href)}
							<span class="mr-1 text-[10px]" aria-hidden="true">●</span>
						{/if}
						{$t('nav.' + item.key)}
					</a>
				{/if}
			{/each}

			<div class="ml-1 shrink-0 pl-1 xl:ml-2 xl:pl-2">
				<ThemeToggle />
			</div>
		</nav>

		<div class="flex items-center gap-1 lg:hidden">
			<ThemeToggle />
			<!-- Mobile toggle -->
			<button
				type="button"
				class="rounded-full p-2.5 text-[var(--color-ink)] transition hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
				onclick={() => {
					if (mobileOpen) closeMobileNav(false);
					else mobileOpen = true;
				}}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
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
	</div>
	</div><!-- /.site-header-vt -->

	<!--
	  Mobile menu: CSS grid 0fr→1fr expand (no Svelte slide / height measure).
	  Outside VT name so it never freezes mid-open during page transitions.
	-->
	<nav
		id="mobile-nav"
		class="mobile-nav border-[var(--color-line)] bg-[var(--color-surface)] lg:hidden"
		class:mobile-nav--open={mobileOpen}
		class:mobile-nav--instant={closeInstant}
		aria-label="Mobile"
		aria-hidden={!mobileOpen}
		inert={!mobileOpen}
	>
		<div class="mobile-nav__clip">
			<div class="mobile-nav__inner px-3 pb-4 pt-1">
				{#each navItems as item (item.href)}
					{#if item.children}
						<!-- Mobile: inline accordion only — never the floating desktop flyout -->
						<div class="py-0.5">
							<button
								type="button"
								class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] transition {isParentActive(
									item
								)
									? 'bg-[var(--color-hover-soft)] font-semibold text-[var(--color-brand)]'
									: 'text-[var(--color-ink)] hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-brand)]'}"
								onclick={() => (mobileServicesOpen = !mobileServicesOpen)}
								aria-expanded={mobileServicesOpen}
							>
								<span class="flex items-center">
									{#if isParentActive(item)}
										<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
									{/if}
									{$t('nav.' + item.key)}
								</span>
								<svg
									class="h-4 w-4 transition-transform duration-200 {mobileServicesOpen
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
							<div
								class="mobile-sub"
								class:mobile-sub--open={mobileServicesOpen}
								aria-hidden={!mobileServicesOpen}
							>
								<div class="mobile-sub__clip">
									<div class="ml-2 border-l border-[var(--color-line-strong)] pl-2">
										{#each item.children as child (child.href)}
											<a
												href={resolve(asNavPath(child.href))}
												class="block rounded-xl px-3 py-2.5 text-[14.5px] transition hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-brand)] {isActive(
													child.href
												)
													? 'font-semibold text-[var(--color-brand)]'
													: 'text-[var(--color-ink)]'}"
												onclick={() => closeMobileNav(true)}
												tabindex={mobileServicesOpen ? 0 : -1}
											>
												{#if isActive(child.href)}
													<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
												{/if}
												{$t('nav.' + child.key)}
											</a>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{:else}
						<a
							href={resolve(asNavPath(item.href))}
							class="block rounded-xl px-3 py-3 text-[15px] transition {isActive(item.href)
								? 'bg-[var(--color-hover-soft)] font-semibold text-[var(--color-brand)]'
								: 'text-[var(--color-ink)] hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-brand)]'}"
							onclick={() => closeMobileNav(true)}
							tabindex={mobileOpen ? 0 : -1}
						>
							{#if isActive(item.href)}
								<span class="mr-1.5 text-[10px]" aria-hidden="true">●</span>
							{/if}
							{$t('nav.' + item.key)}
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</nav>
</header>

<!--
  Desktop flyout only (lg+ / isDesktop).
  Must never mount on phone — mobile uses the drawer accordion exclusively.
-->
{#if desktopServicesOpen && isDesktop && servicesItem?.children}
	<div
		use:portal
		class="services-dropdown fixed z-[300] min-w-[200px] -translate-x-1/2"
		style:top="{menuPos.top}px"
		style:left="{menuPos.left}px"
		role="menu"
		tabindex="-1"
		onmouseenter={keepDesktopServicesOpen}
		onmouseleave={closeDesktopServices}
	>
		<div
			class="services-menu relative rounded-xl border border-[var(--color-panel-border)] bg-[var(--color-panel)] px-2 py-2 shadow-[var(--shadow-card-hover)]"
		>
			<span class="services-tail" aria-hidden="true"></span>
			{#each servicesItem.children as child (child.href)}
				<a
					href={resolve(asNavPath(child.href))}
					role="menuitem"
					class="relative z-10 block whitespace-nowrap rounded-lg px-3.5 py-2.5 text-[14.5px] transition hover:bg-[var(--color-hover-soft)] hover:text-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 {isActive(
						child.href
					)
						? 'bg-[var(--color-hover-soft)] font-semibold text-[var(--color-brand)]'
						: 'text-[var(--color-ink)]'}"
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
	 * Surface-colored notch erases the border line under the tip.
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
		background: var(--color-menu-tail);
	}

	.services-tail::before {
		content: '';
		top: -4px;
		z-index: 2;
		width: 10px;
		height: 10px;
		transform: translateX(-50%) rotate(45deg);
		background: var(--color-menu-tail);
		border-left: 1px solid var(--color-panel-border);
		border-top: 1px solid var(--color-panel-border);
		box-shadow: -1px -1px 2px rgba(17, 24, 39, 0.03);
	}

	.site-logo-link {
		/* Reserve space from the in-flow light logo */
		isolation: isolate;
	}

	/*
	 * Top bar only — stable height for View Transition snapshots.
	 * (Outer sticky wrapper in layout has no VT name.)
	 */
	:global(.site-header-vt) {
		view-transition-name: site-header;
	}

	/* Drawer must not join the header VT group */
	.mobile-nav {
		view-transition-name: none;
		display: grid;
		grid-template-rows: 0fr;
		border-top-width: 0;
		border-top-style: solid;
		transition:
			grid-template-rows 0.28s cubic-bezier(0.22, 1, 0.36, 1),
			border-top-width 0.2s ease;
	}

	.mobile-nav--open {
		grid-template-rows: 1fr;
		border-top-width: 1px;
	}

	/* Instant collapse when following a link / beforeNavigate */
	.mobile-nav--instant,
	.mobile-nav--instant .mobile-sub {
		transition: none !important;
	}

	.mobile-nav__clip {
		min-height: 0;
		overflow: hidden;
	}

	.mobile-nav__inner {
		transform: translateZ(0);
	}

	.mobile-sub {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.22s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.mobile-sub--open {
		grid-template-rows: 1fr;
	}

	.mobile-sub__clip {
		min-height: 0;
		overflow: hidden;
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-nav,
		.mobile-sub {
			transition: none;
		}
	}

	.site-logo {
		transition:
			opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.4s ease,
			transform 0.3s ease;
		will-change: opacity, filter;
	}

	.site-logo--active {
		opacity: 1;
		filter: none;
	}

	.site-logo--inactive {
		opacity: 0;
		filter: blur(2px) saturate(0.85);
	}

	/* Soft brand glow on dark logo when active */
	.site-logo--dark.site-logo--active {
		filter: drop-shadow(0 0 10px rgba(229, 85, 74, 0.18));
	}

	@media (prefers-reduced-motion: reduce) {
		.site-logo {
			transition: opacity 0.15s ease;
		}

		.site-logo--inactive {
			filter: none;
		}
	}
</style>
