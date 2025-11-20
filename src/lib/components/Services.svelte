<script>
	import Reveal from './Reveal.svelte';
	import { t } from 'svelte-i18n';

	const services = [
		{
			key: 'web_dev',
			icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
		},
		{
			key: 'saas',
			icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
		},
		{
			key: 'payment',
			icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
		},
		{
			key: 'mobile',
			icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
		}
	];
</script>

<section id="services" class="py-24">
	<div class="container mx-auto px-6">
		<Reveal>
			<div class="mx-auto mb-16 max-w-2xl text-center">
				<h2 class="mb-4 text-3xl font-bold md:text-4xl">{$t('services.title')}</h2>
				<p class="text-muted-foreground">
					{$t('services.subtitle')}
				</p>
			</div>
		</Reveal>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each services as service, i}
				<Reveal delay={i * 100}>
					<div
						class="group h-full rounded-2xl border border-border bg-secondary/20 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-secondary/40"
					>
						<div
							class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110"
						>
							<svg
								class="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={service.icon} />
							</svg>
						</div>
						<h3 class="mb-2 text-xl font-semibold">{$t(`services.list.${service.key}.title`)}</h3>
						<p class="text-sm leading-relaxed text-muted-foreground">
							{$t(`services.list.${service.key}.description`)}
						</p>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
