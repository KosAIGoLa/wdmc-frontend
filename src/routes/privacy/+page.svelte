<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { privacy, site } from '$lib/data/site';
</script>

<svelte:head>
	<title>隱私權條款 | {site.name}</title>
	<meta name="description" content="瓦當麥可網站隱私權保護政策" />
</svelte:head>

<section class="py-16">
	<div class="mx-auto max-w-4xl px-4">
		<SectionTitle title={privacy.title} />
		<div class="space-y-6 leading-relaxed text-gray-600">
			<p>非常歡迎您光臨「瓦當麥可網站」(以下簡稱本網站)，為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>
			{#each privacy.sections as section (section.title)}
				<div>
					<h2 class="text-lg font-bold text-gray-800">{section.title}</h2>
					<p class="mt-2">{section.content}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
