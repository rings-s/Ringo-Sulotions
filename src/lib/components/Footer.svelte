<script>
	import { t } from 'svelte-i18n';
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-background py-8 text-center">
	<div class="container mx-auto px-6">
		<p class="text-sm text-muted-foreground">
			&copy; {year}
			{$t('footer.rights')}
		</p>
		<p class="mt-2 text-xs text-muted-foreground">
			{$t('footer.built_with')}
		</p>
	</div>
</footer>
