<script lang="ts">
	import { asset } from '$lib/data/site';

	interface Props {
		icon: string;
		label: string;
	}

	let { icon, label }: Props = $props();
</script>

<div
	class="group flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(17,24,39,0.12)]"
>
	<img
		src={asset(icon)}
		alt={label}
		class="h-16 w-16 object-contain transition duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3"
	/>
	<h4 class="mt-4 font-bold text-gray-800 transition-colors group-hover:text-orange-600">
		{label}
	</h4>
</div>
