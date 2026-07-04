<script lang="ts">
	interface Props {
		href: string;
		src: string;
		title: string;
	}

	let { href, src, title }: Props = $props();
</script>

<a href={href} class="group overflow-hidden rounded-lg bg-white shadow-sm">
	<div class="overflow-hidden">
		<img src={src} alt={title} class="h-56 w-full object-cover transition group-hover:scale-105" />
	</div>
	<div class="p-4 text-center">
		<h4 class="font-bold text-gray-800">{title}</h4>
	</div>
</a>
