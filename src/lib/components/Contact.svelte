<script>
	import Reveal from './Reveal.svelte';
	import { t } from 'svelte-i18n';
</script>

<section id="contact" class="relative overflow-hidden py-24">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute top-0 left-1/2 h-full w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
	></div>

	<div class="relative z-10 container mx-auto px-6">
		<Reveal>
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<h2 class="mb-6 text-3xl font-bold md:text-4xl">{$t('contact.title')}</h2>
				<p class="text-xl text-muted-foreground">
					{$t('contact.subtitle')}
				</p>
			</div>
		</Reveal>

		<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
			<Reveal delay={100}>
				<a
					href="mailto:rings9619@gmail.com"
					class="group flex flex-col items-center rounded-2xl border border-border bg-secondary/20 p-8 transition-all hover:border-primary/50 hover:bg-secondary/40"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-1 font-semibold">{$t('contact.email_me')}</h3>
					<p class="text-sm text-muted-foreground">rings9619@gmail.com</p>
				</a>
			</Reveal>

			<Reveal delay={200}>
				<a
					href="tel:+966507441209"
					class="group flex flex-col items-center rounded-2xl border border-border bg-secondary/20 p-8 transition-all hover:border-primary/50 hover:bg-secondary/40"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					</div>
					<h3 class="mb-1 font-semibold">{$t('contact.call_me')}</h3>
					<p class="text-sm text-muted-foreground" dir="ltr">+966 50 744 1209</p>
				</a>
			</Reveal>

			<Reveal delay={300}>
				<div
					class="group flex cursor-pointer flex-col items-center rounded-2xl border border-border bg-secondary/20 p-8 transition-all hover:border-primary/50 hover:bg-secondary/40"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
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
					</div>
					<h3 class="mb-1 font-semibold">{$t('contact.location')}</h3>
					<p class="text-sm text-muted-foreground">{$t('contact.location_value')}</p>
				</div>
			</Reveal>
		</div>
	</div>
</section>
