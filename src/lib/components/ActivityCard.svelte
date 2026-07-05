<script lang="ts">
	interface Props {
		href: string;
		src: string;
		title: string;
	}

	let { href, src, title }: Props = $props();
</script>

<a
	{href}
	class="group overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
>
	<div class="overflow-hidden">
		<img
			{src}
			alt={title}
			class="h-56 w-full object-cover transition duration-500 ease-out group-hover:scale-110"
		/>
	</div>
	<div class="p-4 text-center">
		<h4 class="font-bold text-gray-800 transition-colors group-hover:text-orange-600">{title}</h4>
	</div>
</a>
