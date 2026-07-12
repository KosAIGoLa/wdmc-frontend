<script lang="ts">
	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();
</script>

<!-- Static page banner: no hover zoom / particle overlay -->
<div class="page-banner relative overflow-hidden bg-[#1a1a2e]" data-no-particles>
	<div class="aspect-[21/7] w-full sm:aspect-[21/6] md:aspect-[21/5.5]">
		<img
			{src}
			{alt}
			class="h-full w-full object-cover object-center"
			loading="eager"
			decoding="async"
			draggable="false"
		/>
	</div>
</div>
