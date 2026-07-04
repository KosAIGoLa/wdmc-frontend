<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { contact, site, asset } from '$lib/data/site';
	let agreed = $state(false);
</script>

<svelte:head>
	<title>聯絡我們 | {site.name}</title>
	<meta name="description" content="聯絡瓦當麥可活動整合，取得活動企劃與執行服務。" />
</svelte:head>

<PageBanner src={contact.banner.src} alt={contact.banner.alt} />

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4">
		<SectionTitle title="CONTACT US" />

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Contact channels -->
			<div class="grid gap-6 sm:grid-cols-2">
				{#each contact.channels as channel (channel.title)}
					<div class="rounded-lg bg-white p-6 text-center shadow-sm">
						<img src={asset(channel.icon, channel.local)} alt={channel.title} class="mx-auto h-16 w-16" />
						<p class="mt-2 text-xs font-bold text-gray-400">{channel.label}</p>
						<h3 class="mt-1 font-bold text-gray-800">{channel.title}</h3>
						<div class="mt-2 space-y-1 text-sm text-gray-600">
							{#each channel.values as value (value)}
								{#if channel.mailto}
									<a href="mailto:{value}" class="block hover:text-orange-600">{value}</a>
								{:else}
									<p>{value}</p>
								{/if}
							{/each}
						</div>
						{#if channel.link}
							<a href={channel.link.href} target="_blank" rel="noopener external" class="mt-2 inline-block text-sm font-bold text-orange-600 hover:underline">
								{channel.link.label}
							</a>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Form -->
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<p class="mb-4 text-sm text-gray-600">
					如果你覺得填單麻煩，請到我們臉書私訊我們
					<a href={site.facebook} target="_blank" rel="noopener external" class="font-bold text-orange-600 hover:underline">Facebook</a>
				</p>
				<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
						<input id="name" type="text" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<input id="email" type="email" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
					</div>
					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700">聯絡電話</label>
						<input id="phone" type="tel" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700">需求內容</label>
						<textarea id="message" rows="4" class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"></textarea>
					</div>
					<label class="flex items-start gap-2 text-sm text-gray-600">
						<input type="checkbox" bind:checked={agreed} class="mt-1" />
						<span>本人已詳細閱讀且同意《個人資料及服務條款》</span>
					</label>
					<button
						type="submit"
						disabled={!agreed}
						class="w-full rounded bg-orange-600 py-2 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						送出表單
					</button>
				</form>
			</div>
		</div>

		<!-- Terms -->
		<div class="mt-12 rounded-lg bg-white p-6 shadow-sm">
			<h2 class="text-xl font-bold text-gray-800">個人資料及服務條款</h2>
			<img src={asset('deco.png', true)} alt="" class="mt-2 h-4 w-auto" />
			<ol class="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-600">
				<li>您可自由選擇是否提供您的個人資料，但若您所提供之個人資料，經檢舉或發現不足以確認您的身分真實性或其他個人資料冒用、盜用、資料不實等情形，本公司有權暫時停止提供對您的服務。</li>
				<li>本公司取得您的個人資料，目的在於個人資料保護法及相關法令之規定下，為提供良好服務及業務之必要範圍內蒐集、處理及利用您的個人資料。</li>
				<li>您同意本公司以您所提供的個人資料確認您的身份、與您進行連絡、提供您本公司體系及關係企業或合作夥伴之相關服務及資訊。</li>
				<li>您可依個人資料保護法，就您的個人資料向本公司請求查詢或閱覽、製給複製本、請求補充或更正、請求停止蒐集處理及利用、請求刪除。</li>
				<li>您瞭解此一同意符合個人資料保護法及相關法規之要求，具有書面同意本公司蒐集、處理及利用您的個人資料之效果。</li>
			</ol>
		</div>
	</div>
</section>
