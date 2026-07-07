import { createFavorite, deleteFavorite } from '$lib/api/favorites';
import type { FavoriteType } from '$lib/types/favorite';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const token = cookies.get('session')!;
	const { favoriteType, favoriteId } = await request.json();

	try {
		const favorite = await createFavorite(favoriteType as FavoriteType, Number(favoriteId), token);
		return json(favorite);
	} catch {
		error(400, 'Kunne ikke gemme favorit');
	}
};

export const DELETE: RequestHandler = async ({ request, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const token = cookies.get('session')!;
	const { favoriteType, favoriteId } = await request.json();

	try {
		await deleteFavorite(favoriteType as FavoriteType, Number(favoriteId), token);
		return json({ success: true });
	} catch {
		error(400, 'Kunne ikke fjerne favorit');
	}
};
