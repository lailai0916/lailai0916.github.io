export function scopeArchivePosts<T>(
  posts: readonly T[],
  selectedPosts: readonly T[] | undefined,
  year: number | null,
  getYear: (post: T) => number
): readonly T[] {
  const scoped = selectedPosts ?? posts;
  return year === null ? scoped : scoped.filter((post) => getYear(post) === year);
}

export function searchArchivePosts<T>(
  posts: readonly T[],
  query: string,
  locale: string,
  getValues: (post: T) => string[]
): readonly T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  if (!normalizedQuery) return posts;
  return posts.filter((post) =>
    getValues(post).some((value) => value.toLocaleLowerCase(locale).includes(normalizedQuery))
  );
}
