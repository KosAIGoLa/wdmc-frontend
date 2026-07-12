<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, asset } from '$lib/data/site';
	import { t, content } from '$lib/i18n';
</script>

<footer class="bg-[var(--color-brand-deep)] text-center text-white" id="footer">
	<div class="relative h-[100px] bg-white sm:h-[120px]">
		<div
			class="absolute bottom-[-60px] left-1/2 z-10 h-[120px] w-[120px] -translate-x-1/2 sm:bottom-[-75px] sm:h-[150px] sm:w-[150px]"
		>
			<img
				src={asset('footer-logo.png', true)}
				alt=""
				class="footer-mark h-full w-full cursor-pointer object-contain"
				aria-hidden="true"
			/>
		</div>
	</div>

	<div class="px-4 pb-8 pt-[140px] sm:pb-10 sm:pt-[176px]">
		<div class="mx-auto flex max-w-3xl flex-col items-center">
			<div class="flex items-center justify-center gap-3 sm:gap-4">
				<a
					href={site.facebook}
					target="_blank"
					rel="noopener external"
					aria-label="Facebook"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img
						src={asset('footer-icon1.png', true)}
						alt=""
						class="h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]"
					/>
				</a>
				<a
					href={site.youtube}
					target="_blank"
					rel="noopener external"
					aria-label="YouTube"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img
						src={asset('footer-icon2.png', true)}
						alt=""
						class="h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]"
					/>
				</a>
				<a
					href={site.line}
					target="_blank"
					rel="noopener external"
					aria-label="LINE"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img
						src={asset('footer-icon3.png', true)}
						alt=""
						class="h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]"
					/>
				</a>
			</div>

			<p
				class="mt-10 text-[14px] font-semibold leading-relaxed tracking-wide sm:mt-[58px] sm:text-[16px]"
			>
				{$t('footer.brand')} ｜ {$t('footer.brand2')} ｜ {$t('footer.brand3')}
			</p>
			<p class="mt-8 text-[14px] font-medium leading-relaxed tracking-wide sm:mt-12 sm:text-[16px]">
				{site.phone} / {site.phone2}
			</p>
			<p class="mt-2 text-[14px] font-medium leading-relaxed tracking-wide sm:mt-3 sm:text-[16px]">
				{$t('footer.faxLabel')}&emsp;{site.fax}
			</p>
			{#if $content?.site.address}
				<p class="mt-2 text-[14px] font-medium leading-relaxed tracking-wide sm:mt-3 sm:text-[16px]">
					{$content.site.address}
				</p>
			{/if}
			<a
				href={resolve('/privacy')}
				class="mt-4 text-[14px] font-medium leading-relaxed tracking-wide underline underline-offset-2 transition hover:opacity-80 sm:mt-5 sm:text-[16px]"
			>
				{$t('footer.privacy')}
			</a>
		</div>
	</div>
</footer>

<style>
	.footer-mark:hover {
		animation: footer-mark-sway 0.7s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.footer-mark:hover {
			animation: none;
			transform: scale(1.05);
		}
	}

	@keyframes footer-mark-sway {
		0%,
		100% {
			transform: rotate(0deg) scale(1.05);
		}
		25% {
			transform: rotate(-5deg) scale(1.05);
		}
		75% {
			transform: rotate(5deg) scale(1.05);
		}
	}
</style>
