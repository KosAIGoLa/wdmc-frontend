<script lang="ts">
	import { asset } from '$lib/data/site';

	interface Props {
		icon: string;
		label: string;
	}

	let { icon, label }: Props = $props();
</script>

<div class="card group flex flex-col items-center p-6 text-center">
	<div
		class="flex h-16 w-16 items-center justify-center transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-6"
	>
		<img
			src={asset(icon)}
			alt={label}
			class="h-full w-full object-contain drop-shadow-sm transition duration-500 group-hover:drop-shadow-md"
		/>
	</div>
	<h4
		class="mt-4 font-bold text-gray-900 transition-colors duration-300 group-hover:text-[var(--color-brand)]"
	>
		{label}
	</h4>
</div>
