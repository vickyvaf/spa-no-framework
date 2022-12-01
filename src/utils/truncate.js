export function truncate(text) {
  if (text.length > 25) {
    return text.slice(0, 25) + "...";
  }
  return text;
}