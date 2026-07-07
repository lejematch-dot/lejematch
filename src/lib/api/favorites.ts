import type { Favorite, FavoriteType } from '$lib/types/favorite';
import { apiFetch } from './client';

export function getFavorites(token: string): Promise<Favorite[]> {
	return apiFetch<Favorite[]>('/favorites', { token });
}

export function createFavorite(
	favoriteType: FavoriteType,
	favoriteId: number,
	token: string
): Promise<Favorite> {
	return apiFetch<Favorite>('/favorites', {
		method: 'POST',
		body: JSON.stringify({ FavoriteType: favoriteType, FavoriteID: favoriteId }),
		token
	});
}

export function deleteFavorite(
	favoriteType: FavoriteType,
	favoriteId: number,
	token: string
): Promise<void> {
	return apiFetch<void>(`/favorites?favoriteType=${favoriteType}&favoriteId=${favoriteId}`, {
		method: 'DELETE',
		token
	});
}
