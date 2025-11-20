<script>
	import Reveal from './Reveal.svelte';
	import { t, locale } from 'svelte-i18n';
</script>

<!-- Hero Section with Original Colors and Left Alignment -->
<section
	class="lg:mx0 lg:[70vh] relative flex min-h-[100vh] items-center justify-start overflow-hidden bg-background bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/10 via-background to-background px-4 py-20"
>
	<!-- Elegant Grid Lines -->
	<div class="pointer-events-none absolute inset-0 opacity-[0.03]">
		<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
					<path
						d="M 60 0 L 0 0 0 60"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						class="text-foreground"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#hero-grid)" />
		</svg>
	</div>

	<!-- Minimalistic Animated Gradient Background -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="animate-blob absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-primary/20 mix-blend-screen blur-[120px]"
		></div>
		<div
			class="animate-blob animation-delay-2000 absolute top-[20%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-purple-500/20 mix-blend-screen blur-[120px]"
		></div>
		<div
			class="animate-blob animation-delay-4000 absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-blue-500/20 mix-blend-screen blur-[120px]"
		></div>
	</div>

	<!-- Container -->
	<div class="relative z-10 container mx-auto px-6">
		<Reveal>
			<div class="relative z-20 flex flex-col items-start space-y-6 text-left">
				<!-- Company Badge -->
				<div
					class="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-[10px] font-medium tracking-[0.15em] text-primary uppercase shadow-sm"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
					</span>
					{$t('hero.company')}
				</div>

				<!-- Main Title -->
				<h1
					class="text-7xl font-black tracking-tight text-foreground md:text-7xl lg:text-9xl {$locale ===
					'ar'
						? 'leading-[1.15]'
						: 'leading-[0.75]'}"
				>
					{$t('hero.title_prefix')}
					<span
						class="animate-gradient mt-2 block bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
					>
						{$t('hero.title_suffix')}
					</span>
				</h1>

				<!-- Subtitle -->
				<p class="max-w-2xl text-lg leading-relaxed font-light text-muted-foreground md:text-xl">
					{$t('hero.subtitle_prefix')}
					<span class="font-medium text-foreground">{$t('hero.subtitle_suffix')}</span>
				</p>

				<!-- Buttons -->
				<div class="flex flex-wrap justify-start gap-4 pt-6">
					<a
						href="#contact"
						class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
					>
						<span class="mr-2">{$t('hero.start_project')}</span>
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
					<a
						href="#projects"
						class="border-input inline-flex h-12 items-center justify-center rounded-full border bg-background/50 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
					>
						{$t('hero.view_work')}
					</a>
				</div>
			</div>
		</Reveal>
	</div>

	<!-- Scroll Indicator -->
	<div
		class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-50"
	>
		<span class="text-[10px] tracking-widest text-muted-foreground uppercase"
			>{$t('hero.scroll')}</span
		>
		<div class="h-12 w-[1px] bg-gradient-to-b from-foreground to-transparent"></div>
	</div>
</section>
