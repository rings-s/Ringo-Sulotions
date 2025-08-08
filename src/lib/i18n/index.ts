import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./en.json'));
register('ar', () => import('./ar.json'));

function getInitialLocale() {
  if (!browser) return defaultLocale;
  
  try {
    // Check localStorage first
    const stored = localStorage.getItem('locale');
    if (stored && ['en', 'ar'].includes(stored)) {
      return stored;
    }
    
    // Check browser language
    const browserLang = window.navigator.language;
    if (browserLang.startsWith('ar')) {
      return 'ar';
    }
  } catch (error) {
    console.warn('Error getting initial locale:', error);
  }
  
  return defaultLocale;
}

init({
  fallbackLocale: defaultLocale,
  initialLocale: getInitialLocale(),
});

// Store locale changes in localStorage
if (browser) {
  locale.subscribe((value) => {
    if (value) {
      try {
        localStorage.setItem('locale', value);
      } catch (error) {
        console.warn('Error saving locale:', error);
      }
    }
  });
}
