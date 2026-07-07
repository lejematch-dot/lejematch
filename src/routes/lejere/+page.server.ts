import { getFavorites } from '$lib/api/favorites';
import { getSeekerCities, getSeekers } from '$lib/api/seekers';
import { groupCitiesByRegion } from '$lib/regions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
	const category = url.searchParams.get('category') === 'vaerelse' ? ('vaerelse' as const) : ('hele' as const);

	const csv = (param: string) => url.searchParams.get(param)?.split(',').filter(Boolean) ?? undefined;

	const city = url.searchParams.get('city') ?? undefined;
	const maxBudget = url.searchParams.get('maxBudget') ? Number(url.searchParams.get('maxBudget')) : undefined;
	const roomType =
		category === 'vaerelse' ? (csv('roomType') as ('private' | 'shared')[] | undefined) : undefined;
	const furnishedPreference = csv('furnishedPreference') as ('furnished' | 'unfurnished')[] | undefined;
	const rentalPeriod = csv('rentalPeriod') as ('unlimited' | 'limited')[] | undefined;

	const filters = {
		city,
		maxBudget,
		roomType,
		furnishedPreference,
		rentalPeriod,
		category,
		page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1
	};

	const [result, cities] = await Promise.all([
		getSeekers(filters),
		getSeekerCities(category).catch(() => [])
	]);

	let favoriteIds: number[] = [];
	if (locals.user) {
		const favorites = await getFavorites(cookies.get('session')!).catch(() => []);
		favoriteIds = favorites.filter((f) => f.FavoriteType === 'seeker').map((f) => f.FavoriteID);
	}

	return {
		seekers: result.data,
		total: result.total,
		page: result.page,
		totalPages: result.totalPages,
		favoriteIds,
		category,
		cityGroups: groupCitiesByRegion(cities),
		filters: { city, maxBudget, roomType, furnishedPreference, rentalPeriod }
	};
};
