import { getListings } from '$lib/api/listings';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filters = {
		city: url.searchParams.get('city') ?? undefined,
		min_price: url.searchParams.get('min_price')
			? Number(url.searchParams.get('min_price'))
			: undefined,
		max_price: url.searchParams.get('max_price')
			? Number(url.searchParams.get('max_price'))
			: undefined,
		room_type: (url.searchParams.get('room_type') as 'private' | 'shared' | 'apartment') ?? undefined,
		page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1,
		limit: 20
	};

	const result = await getListings(filters);
	return { listings: result.data, total: result.total, page: result.page };
};
