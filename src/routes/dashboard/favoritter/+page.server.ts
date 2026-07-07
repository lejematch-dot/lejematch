import { getFavorites } from '$lib/api/favorites';
import { getListing } from '$lib/api/listings';
import { getSeeker } from '$lib/api/seekers';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const favorites = await getFavorites(token);

	const listingFavorites = favorites.filter((f) => f.FavoriteType === 'listing');
	const seekerFavorites = favorites.filter((f) => f.FavoriteType === 'seeker');

	const [listings, seekers] = await Promise.all([
		Promise.all(
			listingFavorites.map((f) =>
				getListing(f.FavoriteID).catch(() => null)
			)
		),
		Promise.all(
			seekerFavorites.map((f) =>
				getSeeker(f.FavoriteID).catch(() => null)
			)
		)
	]);

	return {
		listings: listings.filter((l) => l !== null),
		seekers: seekers.filter((s) => s !== null)
	};
};
