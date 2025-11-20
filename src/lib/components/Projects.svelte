<script>
	import Reveal from './Reveal.svelte';
	import { t } from 'svelte-i18n';

	const projects = [
		{
			key: 'auction',
			tech: ['Django', 'Svelte', 'WebSockets'],
			color: 'from-blue-500 to-cyan-500'
		},
		{
			key: 'booking',
			tech: ['Ruby on Rails', 'PostgreSQL', 'Redis'],
			color: 'from-emerald-500 to-teal-500'
		},
		{
			key: 'ecommerce_v1',
			tech: ['Svelte', 'Django', 'Stripe'],
			color: 'from-purple-500 to-pink-500'
		},
		{
			key: 'ecommerce_v2',
			tech: ['Ruby on Rails', 'Hotwire', 'Moyasser'],
			color: 'from-orange-500 to-red-500'
		}
	];
</script>

<section id="projects" class="bg-secondary/30 py-24 px-4">
	<div class="container mx-auto px-6">
		<Reveal>
			<div class="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
				<div>
					<h2 class="mb-2 text-3xl font-bold md:text-4xl">{$t('projects.title')}</h2>
					<p class="text-muted-foreground">{$t('projects.subtitle')}</p>
				</div>
				<a
					href="#contact"
					class="group flex items-center gap-2 font-medium text-primary hover:text-primary/80"
				>
					{$t('projects.view_all')}
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</a>
			</div>
		</Reveal>

		<div class="grid gap-8 md:grid-cols-2">
			{#each projects as project, i}
				<Reveal delay={i * 100}>
					<div
						class="group relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
					>
						<!-- Gradient Overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-br {project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5"
						></div>

						<div class="p-8">
							<div class="mb-4 flex flex-wrap gap-2">
								{#each project.tech as t}
									<span
										class="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
									>
										{t}
									</span>
								{/each}
							</div>

							<h3 class="mb-3 text-2xl font-bold transition-colors group-hover:text-primary">
								{$t(`projects.list.${project.key}.title`)}
							</h3>

							<p class="mb-6 text-muted-foreground">
								{$t(`projects.list.${project.key}.description`)}
							</p>

							<div class="flex items-center gap-4">
								<button
									class="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
								>
									{$t('projects.view_details')}
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
