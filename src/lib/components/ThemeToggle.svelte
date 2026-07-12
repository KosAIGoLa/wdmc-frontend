<script lang="ts">
	import { theme } from '$lib/theme';
	import { t } from '$lib/i18n';

	const isDark = $derived($theme === 'dark');
	const label = $derived(
		isDark ? $t('common.themeToLight') : $t('common.themeToDark')
	);
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={() => theme.toggle()}
	aria-label={label}
	title={label}
	aria-pressed={isDark}
>
	<span class="theme-toggle__track" aria-hidden="true">
		<span class="theme-toggle__thumb" class:theme-toggle__thumb--dark={isDark}>
			{#if isDark}
				<!-- moon -->
				<svg viewBox="0 0 24 24" class="theme-toggle__icon" fill="currentColor" aria-hidden="true">
					<path
						d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
					/>
				</svg>
			{:else}
				<!-- sun -->
				<svg viewBox="0 0 24 24" class="theme-toggle__icon" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="12" cy="12" r="4" />
					<path
						stroke-linecap="round"
						d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
					/>
				</svg>
			{/if}
		</span>
	</span>
	<span class="theme-toggle__text hidden sm:inline">{isDark ? $t('common.themeDark') : $t('common.themeLight')}</span>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		border: 0;
		background: transparent;
		padding: 0.2rem;
		cursor: pointer;
		color: var(--color-ink);
		border-radius: 9999px;
		transition:
			color 0.2s ease,
			background 0.2s ease;
	}

	.theme-toggle:hover {
		color: var(--color-brand);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 3px;
	}

	.theme-toggle__track {
		position: relative;
		display: block;
		width: 3rem;
		height: 1.65rem;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--color-ink) 8%, var(--color-surface));
		border: 1px solid var(--color-line);
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
		transition:
			background 0.3s ease,
			border-color 0.3s ease;
	}

	:global(html.dark) .theme-toggle__track {
		background: color-mix(in srgb, var(--color-brand) 22%, #1a1514);
		border-color: rgba(229, 85, 74, 0.28);
	}

	.theme-toggle__thumb {
		position: absolute;
		top: 50%;
		left: 0.18rem;
		display: grid;
		place-items: center;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 9999px;
		background: #fff;
		color: #e5554a;
		box-shadow: 0 2px 8px rgba(17, 24, 39, 0.14);
		transform: translateY(-50%);
		transition:
			transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
			background 0.25s ease,
			color 0.25s ease;
	}

	.theme-toggle__thumb--dark {
		transform: translate(1.35rem, -50%);
		background: #2a201e;
		color: #ffc9a8;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
	}

	.theme-toggle__icon {
		width: 0.85rem;
		height: 0.85rem;
	}

	.theme-toggle__text {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		min-width: 1.75rem;
	}
</style>
