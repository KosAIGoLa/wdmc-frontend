<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, asset } from '$lib/data/site';
</script>

<footer class="bg-[#302D2C] text-white" id="footer">
	<div class="h-1 bg-[#E5554A]"></div>
	<div class="mx-auto max-w-7xl px-4 py-12 lg:px-8">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="space-y-5">
				<a href={resolve('/')} class="inline-block">
					<img src={asset('footer-logo.png', true)} alt={site.name} class="h-16 w-auto" />
				</a>
				<p class="text-sm leading-relaxed text-gray-300">{site.tagline}</p>
				<div class="flex items-center gap-3">
					<a
						href={site.facebook}
						target="_blank"
						rel="noopener external"
						aria-label="Facebook"
						class="transition hover:scale-110 hover:opacity-80"
					>
						<img src={asset('footer-icon1.png', true)} alt="Facebook" class="h-8 w-8" />
					</a>
					<a
						href={site.youtube}
						target="_blank"
						rel="noopener external"
						aria-label="YouTube"
						class="transition hover:scale-110 hover:opacity-80"
					>
						<img src={asset('footer-icon2.png', true)} alt="YouTube" class="h-8 w-8" />
					</a>
					<a
						href={site.line}
						target="_blank"
						rel="noopener external"
						aria-label="LINE"
						class="transition hover:scale-110 hover:opacity-80"
					>
						<img src={asset('footer-icon3.png', true)} alt="LINE" class="h-8 w-8" />
					</a>
				</div>
			</div>

			<!-- About -->
			<div class="space-y-4">
				<h3 class="text-base font-bold text-white">關於瓦當麥可</h3>
				<ul class="space-y-2.5 text-sm text-gray-300">
					<li>
						<a href={resolve('/')} class="transition-colors hover:text-[#E5554A]">瓦當麥可活動整合</a>
					</li>
					<li>
						<a href={resolve('/activity')} class="transition-colors hover:text-[#E5554A]">勢爵新媒體行銷</a>
					</li>
					<li>
						<a href={resolve('/kids')} class="transition-colors hover:text-[#E5554A]">童藝文創兒童活動</a>
					</li>
					<li>
						<a href={resolve('/privacy')} class="transition-colors hover:text-[#E5554A]">隱私權條款</a>
					</li>
				</ul>
			</div>

			<!-- Services -->
			<div class="space-y-4">
				<h3 class="text-base font-bold text-white">服務項目</h3>
				<ul class="space-y-2.5 text-sm text-gray-300">
					<li>
						<a href={resolve('/wdmc')} class="transition-colors hover:text-[#E5554A]">活動企劃</a>
					</li>
					<li>
						<a href={resolve('/opening')} class="transition-colors hover:text-[#E5554A]">開工動土｜開幕剪綵</a>
					</li>
					<li>
						<a href={resolve('/active')} class="transition-colors hover:text-[#E5554A]">尾牙春酒專案</a>
					</li>
					<li>
						<a href={resolve('/community')} class="transition-colors hover:text-[#E5554A]">硬體搭建</a>
					</li>
				</ul>
			</div>

			<!-- Contact -->
			<div class="space-y-4">
				<h3 class="text-base font-bold text-white">聯絡資訊</h3>
				<ul class="space-y-3 text-sm text-gray-300">
					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-4 w-4 shrink-0 text-[#E5554A]"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
						<div>
							<a href="tel:{site.phone}" class="transition-colors hover:text-white">{site.phone}</a>
							<br />
							<a href="tel:{site.phone2}" class="transition-colors hover:text-white">{site.phone2}</a>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-4 w-4 shrink-0 text-[#E5554A]"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
							/>
						</svg>
						<span>傳真 {site.fax}</span>
					</li>
					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-4 w-4 shrink-0 text-[#E5554A]"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<a href="mailto:{site.email}" class="transition-colors hover:text-white">{site.email}</a>
					</li>
					<li class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-4 w-4 shrink-0 text-[#E5554A]"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<a
							href={site.maps}
							target="_blank"
							rel="noopener external"
							class="transition-colors hover:text-white">{site.address}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
			<p>© {new Date().getFullYear()} {site.name} All Rights Reserved.</p>
		</div>
	</div>
</footer>
