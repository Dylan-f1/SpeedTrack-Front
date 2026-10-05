export function pluralize(count, singular, plural = `${singular}s`) {
  return count > 1 ? plural : singular
}
