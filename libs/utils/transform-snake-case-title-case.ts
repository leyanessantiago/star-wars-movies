export function transformSnakeCaseToTitleCase(input: string) {
  const words = input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}
