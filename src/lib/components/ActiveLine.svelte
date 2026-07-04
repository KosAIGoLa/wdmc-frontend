<script lang="ts">
	import { site, asset } from '$lib/data/site';
</script>

<a
	href={site.lineOfficial}
	target="_blank"
	rel="noopener external"
	class="fixed bottom-[130px] right-1 z-50 flex w-[clamp(48px,5vw,70px)] items-center justify-center transition duration-300 hover:scale-110"
	aria-label="LINE官方帳號"
>
	<img src={asset('icon-line.png', true)} alt="LINE官方帳號" class="w-full" />
</a>
