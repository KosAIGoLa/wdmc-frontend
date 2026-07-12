<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		href: string;
		src: string;
		title: string;
	}

	let { href, src, title }: Props = $props();
</script>

<a
	href={resolve(href as '/wdmc')}
	class="card group overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
>
	<div class="media-frame aspect-[4/3]">
		<img {src} alt={title} loading="lazy" decoding="async" />
	</div>
	<div class="p-4 text-center sm:p-5">
		<h4 class="font-bold text-gray-900 transition-colors duration-300 group-hover:text-[var(--color-brand)]">
			{title}
		</h4>
	</div>
</a>
