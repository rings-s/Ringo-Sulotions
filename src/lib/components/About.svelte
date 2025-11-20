<script>
	import Reveal from './Reveal.svelte';
	import { t } from 'svelte-i18n';
</script>

<section id="about" class="bg-secondary/30 py-24  lg:mx-0">
	<div class="container mx-auto px-6">
		<Reveal>
			<h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">{$t('about.title')}</h2>
		</Reveal>

		<div class="grid items-center gap-12 md:grid-cols-2">
			<Reveal>
				<div class="space-y-6 text-lg text-muted-foreground">
					<p>
						{$t('about.p1_prefix')}
						<span class="font-semibold text-primary">{$t('about.p1_highlight')}</span>
						{$t('about.p1_suffix')}
					</p>
					<p>
						{$t('about.p2_prefix')}
						<span class="font-semibold text-foreground">{$t('about.p2_highlight1')}</span>
						{$t('about.p2_middle')}
						<span class="font-semibold text-foreground">{$t('about.p2_highlight2')}</span>{$t(
							'about.p2_suffix'
						)}
					</p>
					<p>
						{$t('about.p3_prefix')} <span class="text-primary">Svelte</span>
						{$t('about.p3_middle')} <span class="text-primary">Django</span>
						{$t('about.p3_and')} <span class="text-primary">Rails</span>.
					</p>
				</div>
			</Reveal>

			<Reveal delay={200}>
				<div class="grid grid-cols-2 gap-4">
					<div
						class="rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
					>
						<div class="mb-2 text-4xl font-bold text-primary">5+</div>
						<div class="text-sm text-muted-foreground">{$t('about.stats.years_exp')}</div>
					</div>
					<div
						class="rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
					>
						<div class="mb-2 text-4xl font-bold text-primary">20+</div>
						<div class="text-sm text-muted-foreground">{$t('about.stats.projects_delivered')}</div>
					</div>
					<div
						class="rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
					>
						<div class="mb-2 text-4xl font-bold text-primary">100%</div>
						<div class="text-sm text-muted-foreground">{$t('about.stats.client_satisfaction')}</div>
					</div>
					<div
						class="rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
					>
						<div class="mb-2 text-4xl font-bold text-primary">24/7</div>
						<div class="text-sm text-muted-foreground">{$t('about.stats.support')}</div>
					</div>
				</div>
			</Reveal>
		</div>
	</div>
</section>
