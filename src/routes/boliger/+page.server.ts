import { getFavorites } from '$lib/api/favorites';
import { getListingCities, getListings } from '$lib/api/listings';
import { groupCitiesByRegion } from '$lib/regions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
	const category = url.searchParams.get('category') === 'vaerelse' ? ('vaerelse' as const) : ('hele' as const);

	const csv = (param: string) => url.searchParams.get(param)?.split(',').filter(Boolean) ?? undefined;

	const filters = {
		city: url.searchParams.get('city') ?? undefined,
		minPrice: url.searchParams.get('minPrice') ? Number(url.searchParams.get('minPrice')) : undefined,
		maxPrice: url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined,
		landlordType: csv('landlordType') as ('boligselskab' | 'privat')[] | undefined,
		furnishedPreference: csv('furnishedPreference') as ('furnished' | 'unfurnished' | 'any')[] | undefined,
		listingKind: csv('listingKind') as ('1v' | '2v' | '3v' | '4v' | '5v')[] | undefined,
		rentalPeriod: csv('rentalPeriod') as ('unlimited' | 'limited')[] | undefined,
		category,
		page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1
	};

	const [result, cities] = await Promise.all([
		getListings(filters),
		getListingCities(category).catch(() => [])
	]);

	let favoriteIds: number[] = [];
	if (locals.user) {
		const favorites = await getFavorites(cookies.get('session')!).catch(() => []);
		favoriteIds = favorites.filter((f) => f.FavoriteType === 'listing').map((f) => f.FavoriteID);
	}

	return {
		listings: result.data,
		total: result.total,
		page: result.page,
		totalPages: result.totalPages,
		favoriteIds,
		category,
		cityGroups: groupCitiesByRegion(cities),
		filters: {
			city: filters.city,
			minPrice: filters.minPrice,
			maxPrice: filters.maxPrice,
			landlordType: filters.landlordType,
			furnishedPreference: filters.furnishedPreference,
			listingKind: filters.listingKind,
			rentalPeriod: filters.rentalPeriod
		}
	};
};
