const LOCAL_STORAGE_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
const THEME_MEDIA_QUERY = `(prefers-color-scheme: ${ LIGHT_THEME })`;

/**
 * Check if the user prefers dark or light mode
 */
export const userPrefersDark = (): boolean => {
  // Get theme from local storage
  const localTheme = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  // No theme in local storage but user prefers light
  if (!localTheme && window.matchMedia && window.matchMedia(THEME_MEDIA_QUERY).matches) {
    return false;
  // User prefers dark theme unless theme is set to exactly 'light'
  } else if (localTheme) {
    return localTheme !== LIGHT_THEME;
  // Default to dark
  } else {
    return true;
  }
}

/**
 * Set the theme
 * @param dark user prefers dark mode
 */
export const setThemeInLocalStorage = (dark: boolean) => {
  const theme = dark ? DARK_THEME : LIGHT_THEME
  window.localStorage.setItem(LOCAL_STORAGE_KEY, theme);
}