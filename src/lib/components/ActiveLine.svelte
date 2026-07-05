<script lang="ts">
	import { site, asset } from '$lib/data/site';
	import { t } from '$lib/i18n';
</script>

<a
	href={site.lineOfficial}
	target="_blank"
	rel="noopener external"
	style:bottom="calc(53px + clamp(48px, 5vw, 70px))"
	class="fixed right-0 z-50 flex aspect-square w-[clamp(48px,5vw,70px)] items-center justify-center leading-none transition duration-300 hover:scale-110"
	aria-label={$t('common.lineOfficial')}
>
	<img src={asset('icon-line.png', true)} alt={$t('common.lineOfficial')} class="block w-full scale-[1.03]" />
</a>
