<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, asset } from '$lib/data/site';
	import { t } from '$lib/i18n';
</script>

<footer class="bg-[#df4059] text-center text-white" id="footer">
	<div class="relative h-[120px] bg-white">
		<img
			src={asset('footer-logo.png', true)}
			alt=""
			class="pointer-events-none absolute bottom-[-75px] left-1/2 z-10 h-[150px] w-[150px] -translate-x-1/2 object-contain"
			aria-hidden="true"
		/>
	</div>

	<div class="px-4 pb-6 pt-[176px]">
		<div class="mx-auto flex max-w-3xl flex-col items-center">
			<div class="flex items-center justify-center gap-4">
				<a
					href={site.facebook}
					target="_blank"
					rel="noopener external"
					aria-label="Facebook"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img src={asset('footer-icon1.png', true)} alt="" class="h-[60px] w-[60px]" />
				</a>
				<a
					href={site.youtube}
					target="_blank"
					rel="noopener external"
					aria-label="YouTube"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img src={asset('footer-icon2.png', true)} alt="" class="h-[60px] w-[60px]" />
				</a>
				<a
					href={site.line}
					target="_blank"
					rel="noopener external"
					aria-label="LINE"
					class="transition hover:-translate-y-0.5 hover:opacity-85"
				>
					<img src={asset('footer-icon3.png', true)} alt="" class="h-[60px] w-[60px]" />
				</a>
			</div>

			<p class="mt-[58px] text-[16px] font-semibold leading-relaxed tracking-wide">
				{$t('footer.brand')} ｜ {$t('footer.brand2')} ｜ {$t('footer.brand3')}
			</p>
			<p class="mt-12 text-[16px] font-medium leading-relaxed tracking-wide">
				{site.phone} / {site.phone2}
			</p>
			<p class="mt-3 text-[16px] font-medium leading-relaxed tracking-wide">
				{$t('footer.faxLabel')}　{site.fax}
			</p>
			<p class="mt-3 text-[16px] font-medium leading-relaxed tracking-wide">{site.address}</p>
			<a
				href={resolve('/privacy')}
				class="mt-5 text-[16px] font-medium leading-relaxed tracking-wide underline underline-offset-2 transition hover:opacity-80"
			>
				{$t('footer.privacy')}
			</a>
		</div>
	</div>
</footer>
