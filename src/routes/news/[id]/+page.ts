import { news } from '$lib/data/site';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return news.items.map((item) => ({ id: item.id }));
};

export const prerender = true;
