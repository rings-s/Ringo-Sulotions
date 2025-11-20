<script>
	import { onMount } from 'svelte';
	import { t, locale } from 'svelte-i18n';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	// Subscribe to locale changes to update document direction
	$effect(() => {
		if ($locale) {
			document.dir = $locale === 'ar' ? 'rtl' : 'ltr';
			document.documentElement.lang = $locale;
		}
	});

	function handleScroll() {
		isScrolled = window.scrollY > 50;
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function toggleLanguage() {
		const newLocale = $locale === 'en' ? 'ar' : 'en';
		locale.set(newLocale);
		localStorage.setItem('locale', newLocale);
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);

		// Load saved locale if any
		const savedLocale = localStorage.getItem('locale');
		if (savedLocale) {
			locale.set(savedLocale);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.body.style.overflow = ''; // Cleanup
		};
	});
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class="fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out
  {isScrolled || isMobileMenuOpen
		? 'border-b border-border bg-background/80 py-4 shadow-sm backdrop-blur-md'
		: 'bg-transparent py-6'}"
>
	<div class="container mx-auto flex items-center justify-between px-6">
		<a
			href="/"
			class="relative z-50 text-2xl font-bold tracking-tighter transition-colors hover:text-primary"
		>
			Ringo<span class="text-primary">.</span>
		</a>

		<!-- Desktop Menu -->
		<div class="hidden items-center gap-8 text-sm font-medium lg:flex">
			<a href="#about" class="transition-colors hover:text-primary">{$t('navbar.about')}</a>
			<a href="#services" class="transition-colors hover:text-primary">{$t('navbar.services')}</a>
			<a href="#projects" class="transition-colors hover:text-primary">{$t('navbar.projects')}</a>
			<a
				href="#contact"
				class="rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
			>
				{$t('navbar.contact')}
			</a>

			<!-- Language Toggle Button -->
			<button
				onclick={toggleLanguage}
				class="group flex items-center gap-2 rounded-md border border-border px-3 py-1.5 transition-all hover:border-primary/50 hover:bg-primary/5"
				aria-label="Toggle Language"
			>
				<span class="font-bold {$locale === 'en' ? 'text-primary' : 'text-muted-foreground'}"
					>EN</span
				>
				<span class="h-4 w-[1px] bg-border transition-colors group-hover:bg-primary/30"></span>
				<span
					class="font-['IBM_Plex_Sans_Arabic'] font-bold {$locale === 'ar'
						? 'text-primary'
						: 'text-muted-foreground'}">عربي</span
				>
			</button>
		</div>

		<!-- Mobile Menu Button -->
		<div class="relative z-50 flex items-center gap-4 lg:hidden">
			<!-- Mobile Language Toggle -->
			<button
				onclick={toggleLanguage}
				class="flex items-center gap-2 rounded-md border border-border/50 px-2 py-1 transition-colors hover:bg-primary/5"
			>
				<span
					class="text-xs font-bold {$locale === 'en' ? 'text-primary' : 'text-muted-foreground'}"
					>EN</span
				>
				<span class="h-3 w-[1px] bg-border"></span>
				<span
					class="font-['IBM_Plex_Sans_Arabic'] text-xs font-bold {$locale === 'ar'
						? 'text-primary'
						: 'text-muted-foreground'}">عربي</span
				>
			</button>

			<button
				class="p-2 text-foreground transition-colors hover:text-primary"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				<div class="relative h-4 w-6">
					<span
						class="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out {isMobileMenuOpen
							? 'top-1.5 rotate-45'
							: 'top-0'}"
					></span>
					<span
						class="absolute top-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out {isMobileMenuOpen
							? 'opacity-0'
							: 'opacity-100'}"
					></span>
					<span
						class="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-in-out {isMobileMenuOpen
							? 'top-1.5 -rotate-45'
							: 'top-3'}"
					></span>
				</div>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile Menu Overlay -->
{#if isMobileMenuOpen}
	<div
		class="animate-in fade-in slide-in-from-top-5 fixed inset-0 z-40 flex h-[100dvh] w-full flex-col items-center justify-center space-y-8 overflow-y-auto bg-background/95 pt-20 pb-10 backdrop-blur-xl duration-200 lg:hidden"
	>
		<a
			href="#about"
			onclick={toggleMobileMenu}
			class="text-3xl font-bold tracking-tight transition-colors hover:text-primary"
			>{$t('navbar.about')}</a
		>
		<a
			href="#services"
			onclick={toggleMobileMenu}
			class="text-3xl font-bold tracking-tight transition-colors hover:text-primary"
			>{$t('navbar.services')}</a
		>
		<a
			href="#projects"
			onclick={toggleMobileMenu}
			class="text-3xl font-bold tracking-tight transition-colors hover:text-primary"
			>{$t('navbar.projects')}</a
		>
		<a
			href="#contact"
			onclick={toggleMobileMenu}
			class="mt-4 rounded-full bg-primary px-8 py-4 text-xl font-medium text-primary-foreground transition-colors hover:bg-primary/90"
		>
			{$t('navbar.contact')}
		</a>
	</div>
{/if}
