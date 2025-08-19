export function buildLessonPath(slug: string): string {
	const safe = encodeURIComponent(slug || '');
	return `/learning/lessons/${safe}`;
}

export function buildCategoryPath(categoryId: string): string {
	const safe = encodeURIComponent(categoryId || '');
	return `/learning?category=${safe}`;
}
