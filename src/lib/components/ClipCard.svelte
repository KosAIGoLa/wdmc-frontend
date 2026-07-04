<script lang="ts">
	interface Props {
		src: string;
		year: string;
		title: string;
		desc: string;
	}

	let { src, year, title, desc }: Props = $props();
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-sm">
	<img src={src} alt={title} class="h-48 w-full object-cover" />
	<div class="p-4">
		<p class="text-xs text-gray-400">{year}</p>
		<h4 class="mt-1 font-bold text-gray-800">{title}</h4>
		<p class="mt-2 text-sm text-gray-600">{desc}</p>
	</div>
</div>
