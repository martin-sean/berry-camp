export const formatSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${ minutes ? `${ minutes.toString().padStart(1, '0') }` : '0' }:${ seconds.toString().padStart(2, '0')}`;
}

export const formatSecondsWords = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${ minutes ? `${ minutes }m ` : '' }${ seconds }s`;
}
