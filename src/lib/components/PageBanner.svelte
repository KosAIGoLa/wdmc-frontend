<script lang="ts">
	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();
</script>

<div class="media-frame media-frame--soft relative bg-[#1a1a2e]">
	<div class="aspect-[21/7] w-full sm:aspect-[21/6] md:aspect-[21/5.5]">
		<img {src} {alt} class="h-full w-full object-cover object-center" loading="eager" decoding="async" />
	</div>
</div>
