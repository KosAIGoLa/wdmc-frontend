<script lang="ts">
	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();
</script>

<div class="overflow-hidden">
	<img {src} {alt} class="h-auto w-full transition duration-[1200ms] ease-out hover:scale-[1.02]" />
</div>
