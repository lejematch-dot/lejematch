import { getListings } from '$lib/api/listings';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filters = {
		city: url.searchParams.get('city') ?? undefined,
		minPrice: url.searchParams.get('minPrice') ? Number(url.searchParams.get('minPrice')) : undefined,
		maxPrice: url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined,
		roomType: (url.searchParams.get('roomType') as 'private' | 'shared' | 'apartment') ?? undefined,
		page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1
	};

	const result = await getListings(filters);
	return { listings: result.data, total: result.total, page: result.page, totalPages: result.totalPages };
};
