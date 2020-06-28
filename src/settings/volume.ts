const LOCAL_STORAGE_KEY = 'volume';

/**
 * Check if the user prefers dark or light mode
 */
export const getVolumeOrMute = (): number => {
  // Get theme from local storage
  const localVolume = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  // If volume in local storage, try to parse it
  if (localVolume) {
    // Return volume
    try {
      const volume = parseInt(localVolume);
      if (volume < 0) return 0; // Set min 0
      if (volume > 100) return 100; // Set max 100
      return volume; // Return volume if between 0 - 100
    } catch {
      // Could not parse, mute
      return 0;
    }
  } else {
    // No local storage value, mute
    return 0;
  }
}

/**
 * Set the theme
 * @param dark user prefers dark mode
 */
export const setVolumeInLocalStorage = (volume: number) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, volume.toString());
}