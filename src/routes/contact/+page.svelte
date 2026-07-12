<script lang="ts">
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import PageBanner from '$lib/components/PageBanner.svelte';
	import { t, content, tAny } from '$lib/i18n';
	import { contact, site, asset } from '$lib/data/site';

	type FieldKey = 'name' | 'email' | 'phone' | 'message' | 'agree';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let agreed = $state(false);
	let submitted = $state(false);
	let triedSubmit = $state(false);
	let errors = $state<Partial<Record<FieldKey, string>>>({});
	let formEl: HTMLFormElement | undefined = $state();

	const c = $derived($content);
	const terms = $derived.by(() => {
		const value = $tAny('pages.contact.terms');
		return Array.isArray(value) ? (value as string[]) : [];
	});

	function channelValues(key: string): string[] {
		if (!c) return [];
		if (key === 'phone') return [site.phone, site.phone2];
		if (key === 'address') return [c.site.address];
		if (key === 'email') return [site.email];
		if (key === 'line') return [...(c.contact.channels.line.values ?? [])];
		return [];
	}

	function isEmail(value: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	/** Accepts TW mobile / landline / simple international formats */
	function isPhone(value: string) {
		const digits = value.replace(/[\s\-()#+]/g, '');
		return /^\d{8,15}$/.test(digits);
	}

	function collectErrors(): Partial<Record<FieldKey, string>> {
		const next: Partial<Record<FieldKey, string>> = {};

		if (!name.trim()) next.name = $t('pages.contact.formErrorRequired');
		if (!email.trim()) next.email = $t('pages.contact.formErrorRequired');
		else if (!isEmail(email.trim())) next.email = $t('pages.contact.formErrorEmail');
		if (!phone.trim()) next.phone = $t('pages.contact.formErrorRequired');
		else if (!isPhone(phone.trim())) next.phone = $t('pages.contact.formErrorPhone');
		if (!message.trim()) next.message = $t('pages.contact.formErrorRequired');
		if (!agreed) next.agree = $t('pages.contact.formErrorAgree');

		return next;
	}

	function validate(showAll = true): boolean {
		const next = collectErrors();

		if (showAll) {
			errors = next;
		} else {
			// After first submit: re-validate and drop fixed fields, update remaining
			const updated: Partial<Record<FieldKey, string>> = {};
			for (const key of Object.keys(errors) as FieldKey[]) {
				if (next[key]) updated[key] = next[key];
			}
			// Also surface errors for fields user is fixing into a new invalid state
			for (const key of Object.keys(next) as FieldKey[]) {
				if (triedSubmit) updated[key] = next[key];
			}
			errors = updated;
		}

		return Object.keys(next).length === 0;
	}

	function onFieldInput() {
		if (!triedSubmit) return;
		validate(false);
	}

	function fieldClass(key: FieldKey) {
		const base =
			'mt-1 w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2';
		if (errors[key]) {
			return `${base} border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-200`;
		}
		return `${base} border-gray-300 focus:border-orange-500 focus:ring-orange-200`;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		triedSubmit = true;
		submitted = false;

		const ok = validate(true);
		if (!ok) {
			// Focus first invalid field
			const order: FieldKey[] = ['name', 'email', 'phone', 'message', 'agree'];
			const first = order.find((k) => errors[k]);
			if (first === 'agree') {
				formEl?.querySelector<HTMLInputElement>('#agree')?.focus();
			} else if (first) {
				formEl?.querySelector<HTMLElement>(`#${first}`)?.focus();
			}
			return;
		}

		// No backend yet — show success and reset
		submitted = true;
		name = '';
		email = '';
		phone = '';
		message = '';
		agreed = false;
		errors = {};
		triedSubmit = false;
	}
</script>

<svelte:head>
	<title>{$t('nav.contact')} | {$t('site.name')}</title>
	<meta name="description" content={$t('pages.contact.metaDescription')} />
</svelte:head>

{#if c}
	<PageBanner src={contact.banner.src} alt={c.contact.bannerAlt} />

	<section class="section">
		<div class="container-page">
			<SectionTitle title={$t('pages.contact.sectionTitle')} />

			<div class="grid gap-8 lg:grid-cols-2">
				<div class="grid gap-5 sm:grid-cols-2">
					{#each contact.channels as channel (channel.key)}
						{@const ch = c.contact.channels[channel.key as keyof typeof c.contact.channels]}
						<div class="card group p-6 text-center">
							<img
								src={asset(channel.icon, channel.local)}
								alt={ch.title}
								class="mx-auto h-16 w-16 transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
							/>
							<p class="mt-2 text-xs font-bold text-gray-400">{ch.label}</p>
							<h3
								class="mt-1 font-bold text-gray-900 transition-colors group-hover:text-[var(--color-brand)]"
							>
								{ch.title}
							</h3>
							<div class="mt-2 space-y-1 text-sm text-gray-600">
								{#each channelValues(channel.key) as value (value)}
									{#if channel.mailto}
										<a
											href="mailto:{value}"
											class="block transition hover:text-[var(--color-brand)] hover:underline"
											>{value}</a
										>
									{:else}
										<p>{value}</p>
									{/if}
								{/each}
							</div>
							{#if channel.hasMap}
								<a
									href={site.maps}
									target="_blank"
									rel="noopener external"
									class="btn-outline mt-3 px-4 py-1.5 text-sm"
								>
									{c.contact.channels.address.map}
								</a>
							{/if}
							{#if channel.hasLine}
								<a
									href={site.line}
									target="_blank"
									rel="noopener external"
									class="btn-outline mt-3 px-4 py-1.5 text-sm"
								>
									{c.contact.channels.line.addFriend}
								</a>
							{/if}
						</div>
					{/each}
				</div>

				<div class="card p-6">
					<p class="mb-4 text-sm text-gray-600">
						{$t('pages.contact.facebookHint')}
						<a
							href={site.facebook}
							target="_blank"
							rel="noopener external"
							class="font-bold text-[var(--color-brand)] transition hover:underline"
							>{$t('pages.contact.facebook')}</a
						>
					</p>

					{#if submitted}
						<div
							class="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
							role="status"
						>
							{$t('pages.contact.formSuccess')}
						</div>
					{/if}

					{#if triedSubmit && Object.keys(errors).length > 0}
						<div
							class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
							role="alert"
						>
							{$t('pages.contact.formErrorSummary')}
						</div>
					{/if}

					<form
						bind:this={formEl}
						class="space-y-4"
						novalidate
						onsubmit={handleSubmit}
					>
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700">
								{$t('pages.contact.formName')}
								<span class="text-[var(--color-brand)]" aria-hidden="true">*</span>
							</label>
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								required
								aria-required="true"
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={errors.name ? 'name-error' : undefined}
								bind:value={name}
								oninput={onFieldInput}
								class={fieldClass('name')}
							/>
							{#if errors.name}
								<p id="name-error" class="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
							{/if}
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">
								{$t('pages.contact.formEmail')}
								<span class="text-[var(--color-brand)]" aria-hidden="true">*</span>
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								aria-required="true"
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={errors.email ? 'email-error' : undefined}
								bind:value={email}
								oninput={onFieldInput}
								class={fieldClass('email')}
							/>
							{#if errors.email}
								<p id="email-error" class="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
							{/if}
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium text-gray-700">
								{$t('pages.contact.formPhone')}
								<span class="text-[var(--color-brand)]" aria-hidden="true">*</span>
							</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								required
								aria-required="true"
								aria-invalid={errors.phone ? 'true' : undefined}
								aria-describedby={errors.phone ? 'phone-error' : undefined}
								bind:value={phone}
								oninput={onFieldInput}
								class={fieldClass('phone')}
							/>
							{#if errors.phone}
								<p id="phone-error" class="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
							{/if}
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-gray-700">
								{$t('pages.contact.formMessage')}
								<span class="text-[var(--color-brand)]" aria-hidden="true">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								required
								aria-required="true"
								aria-invalid={errors.message ? 'true' : undefined}
								aria-describedby={errors.message ? 'message-error' : undefined}
								bind:value={message}
								oninput={onFieldInput}
								class={fieldClass('message')}
							></textarea>
							{#if errors.message}
								<p id="message-error" class="mt-1 text-xs font-medium text-red-600">
									{errors.message}
								</p>
							{/if}
						</div>

						<div>
							<label
								class="flex items-start gap-2 text-sm {errors.agree
									? 'text-red-700'
									: 'text-gray-600'}"
							>
								<input
									id="agree"
									name="agree"
									type="checkbox"
									required
									aria-required="true"
									aria-invalid={errors.agree ? 'true' : undefined}
									aria-describedby={errors.agree ? 'agree-error' : undefined}
									bind:checked={agreed}
									onchange={onFieldInput}
									class="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-brand)] accent-[var(--color-brand)] focus:ring-[var(--color-brand)]"
								/>
								<span>
									{$t('pages.contact.formAgree')}
									<span class="text-[var(--color-brand)]" aria-hidden="true">*</span>
								</span>
							</label>
							{#if errors.agree}
								<p id="agree-error" class="mt-1 text-xs font-medium text-red-600">{errors.agree}</p>
							{/if}
						</div>

						<button type="submit" class="btn-primary w-full">
							{$t('pages.contact.formSubmit')}
						</button>
					</form>
				</div>
			</div>

			<div class="card mt-12 p-6">
				<h2 class="text-xl font-bold text-gray-900">{$t('pages.contact.termsTitle')}</h2>
				<img src={asset('deco.png', true)} alt="" class="mt-2 h-4 w-auto" aria-hidden="true" />
				<ol class="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-600">
					{#each terms as term, index (index)}
						<li>{term}</li>
					{/each}
				</ol>
			</div>
		</div>
	</section>
{/if}
