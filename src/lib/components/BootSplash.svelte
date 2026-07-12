<script lang="ts">
	import { theme } from '$lib/theme';
	import { t } from '$lib/i18n';
	import { asset } from '$lib/data/site';

	interface Props {
		/** Soft exit when parent is about to show the shell */
		exiting?: boolean;
	}

	let { exiting = false }: Props = $props();
</script>

<div
	class="boot-splash"
	class:boot-splash--exit={exiting}
	aria-busy="true"
	aria-live="polite"
	role="status"
>
	<div class="boot-splash__glow boot-splash__glow--a" aria-hidden="true"></div>
	<div class="boot-splash__glow boot-splash__glow--b" aria-hidden="true"></div>

	<div class="boot-splash__card">
		<!-- Brand pinwheel -->
		<div class="boot-mark" aria-hidden="true">
			<div class="boot-mark__spin">
				<span class="boot-mark__q boot-mark__q--tl"></span>
				<span class="boot-mark__q boot-mark__q--tr"></span>
				<span class="boot-mark__q boot-mark__q--br"></span>
				<span class="boot-mark__q boot-mark__q--bl"></span>
				<span class="boot-mark__core"></span>
			</div>
			<span class="boot-mark__ring"></span>
			<span class="boot-mark__pulse"></span>
		</div>

		<img
			src={asset($theme === 'dark' ? 'logo-dark.png' : 'logo.png', true)}
			alt=""
			class="boot-splash__logo"
			aria-hidden="true"
		/>

		<div class="boot-splash__track" aria-hidden="true">
			<span class="boot-splash__fill"></span>
			<span class="boot-splash__shimmer"></span>
		</div>

		<p class="boot-splash__label">
			{$t('common.loading')}
			<span class="boot-splash__dots" aria-hidden="true">
				<span>.</span><span>.</span><span>.</span>
			</span>
		</p>
	</div>
</div>

<style>
	.boot-splash {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: var(--color-surface, #ffffff);
		color: var(--color-ink, #302d2c);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0.5s step-end;
	}

	.boot-splash--exit {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition:
			opacity 0.48s cubic-bezier(0.4, 0, 0.2, 1),
			visibility 0s linear 0.48s;
	}

	.boot-splash__glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(52px);
		pointer-events: none;
		opacity: 0.6;
		animation: boot-float 5.5s ease-in-out infinite;
	}

	.boot-splash__glow--a {
		width: min(52vw, 320px);
		height: min(52vw, 320px);
		top: 10%;
		left: 6%;
		background: radial-gradient(circle, rgba(229, 85, 74, 0.24), transparent 70%);
	}

	.boot-splash__glow--b {
		width: min(48vw, 280px);
		height: min(48vw, 280px);
		right: 4%;
		bottom: 12%;
		background: radial-gradient(circle, rgba(91, 192, 235, 0.16), transparent 70%);
		animation-delay: -2.4s;
	}

	.boot-splash__card {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.35rem;
		padding: 2rem 1.5rem;
		animation: boot-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	/* ---- pinwheel ---- */
	.boot-mark {
		position: relative;
		width: 4.75rem;
		height: 4.75rem;
		display: grid;
		place-items: center;
	}

	.boot-mark__spin {
		position: relative;
		width: 2.9rem;
		height: 2.9rem;
		animation: boot-spin 1.4s linear infinite;
	}

	.boot-mark__q {
		position: absolute;
		width: 46%;
		height: 46%;
	}

	.boot-mark__q--tl {
		top: 2%;
		left: 2%;
		border-radius: 0.65rem 0.12rem 0.12rem 0.12rem;
		background: #5bc0eb;
	}

	.boot-mark__q--tr {
		top: 2%;
		right: 2%;
		border-radius: 0.12rem 0.65rem 0.12rem 0.12rem;
		background: #f0c41a;
	}

	.boot-mark__q--br {
		bottom: 2%;
		right: 2%;
		border-radius: 0.12rem 0.12rem 0.65rem 0.12rem;
		background: #e5554a;
	}

	.boot-mark__q--bl {
		bottom: 2%;
		left: 2%;
		border-radius: 0.12rem 0.12rem 0.12rem 0.65rem;
		background: #8fbf4d;
	}

	.boot-mark__core {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 0 2px rgba(48, 45, 44, 0.08);
		transform: translate(-50%, -50%);
	}

	:global(html.dark) .boot-mark__core {
		background: #1a1715;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
	}

	.boot-mark__ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1.5px solid transparent;
		border-top-color: rgba(229, 85, 74, 0.55);
		border-right-color: rgba(229, 85, 74, 0.15);
		animation: boot-spin 0.9s linear infinite reverse;
	}

	.boot-mark__pulse {
		position: absolute;
		inset: -6px;
		border-radius: 50%;
		border: 1px solid rgba(229, 85, 74, 0.35);
		animation: boot-pulse 1.6s ease-out infinite;
	}

	.boot-splash__logo {
		width: min(200px, 58vw);
		height: auto;
		animation: boot-logo-breathe 2.2s ease-in-out infinite;
	}

	.boot-splash__track {
		position: relative;
		width: 9rem;
		height: 3px;
		border-radius: 9999px;
		background: var(--color-line, rgba(17, 24, 39, 0.08));
		overflow: hidden;
	}

	.boot-splash__fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: 42%;
		border-radius: inherit;
		background: linear-gradient(90deg, #e5554a, #f08a5a);
		animation: boot-bar 1.15s cubic-bezier(0.45, 0, 0.2, 1) infinite;
	}

	.boot-splash__shimmer {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			105deg,
			transparent 40%,
			rgba(255, 255, 255, 0.55) 50%,
			transparent 60%
		);
		animation: boot-shimmer 1.6s ease-in-out infinite;
	}

	.boot-splash__label {
		margin: 0;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-muted, #6b7280);
	}

	.boot-splash__dots span {
		display: inline-block;
		animation: boot-dot 1.2s ease-in-out infinite;
		opacity: 0.25;
	}

	.boot-splash__dots span:nth-child(2) {
		animation-delay: 0.15s;
	}

	.boot-splash__dots span:nth-child(3) {
		animation-delay: 0.3s;
	}

	@keyframes boot-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes boot-pulse {
		0% {
			transform: scale(0.88);
			opacity: 0.7;
		}
		100% {
			transform: scale(1.25);
			opacity: 0;
		}
	}

	@keyframes boot-float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(12px, -16px) scale(1.06);
		}
	}

	@keyframes boot-card-in {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes boot-logo-breathe {
		0%,
		100% {
			opacity: 0.88;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.02);
		}
	}

	@keyframes boot-bar {
		0% {
			transform: translateX(-120%);
		}
		100% {
			transform: translateX(280%);
		}
	}

	@keyframes boot-shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes boot-dot {
		0%,
		80%,
		100% {
			opacity: 0.2;
			transform: translateY(0);
		}
		40% {
			opacity: 1;
			transform: translateY(-1px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot-mark__spin,
		.boot-mark__ring,
		.boot-mark__pulse,
		.boot-splash__glow,
		.boot-splash__logo,
		.boot-splash__fill,
		.boot-splash__shimmer,
		.boot-splash__dots span {
			animation: none !important;
		}

		.boot-splash__fill {
			width: 100%;
			transform: none;
		}

		.boot-splash__card {
			animation: none;
		}
	}
</style>
