<script lang="ts">
	import { asset } from '$lib/data/site';

	interface Props {
		icon: string;
		label: string;
	}

	let { icon, label }: Props = $props();
</script>

<div class="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm">
	<img src={asset(icon)} alt={label} class="h-16 w-16 object-contain" />
	<h4 class="mt-4 font-bold text-gray-800">{label}</h4>
</div>
