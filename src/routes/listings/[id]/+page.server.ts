import { getFavorites } from '$lib/api/favorites';
import { contactListing, getListing } from '$lib/api/listings';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Bolig ikke fundet');

	try {
		const listing = await getListing(id);

		let isFavorite = false;
		if (locals.user) {
			const favorites = await getFavorites(cookies.get('session')!).catch(() => []);
			isFavorite = favorites.some((f) => f.FavoriteType === 'listing' && f.FavoriteID === id);
		}

		return { listing, isFavorite };
	} catch {
		error(404, 'Bolig ikke fundet');
	}
};

export const actions: Actions = {
	contact: async ({ request, params, locals, cookies }) => {
		if (!locals.user) return fail(401, { error: 'Log ind for at kontakte.' });

		const id = Number(params.id);
		if (isNaN(id)) error(404, 'Bolig ikke fundet');

		const token = cookies.get('session')!;
		const data = await request.formData();
		const senderPhone = String(data.get('senderPhone') ?? '');
		const message = String(data.get('message') ?? '');

		if (!message) {
			return fail(400, { error: 'Skriv en besked.' });
		}

		try {
			await contactListing(id, { senderPhone, message }, token);
		} catch (e) {
			console.error('KONTAKT FEJL:', e);
			return fail(500, { error: 'Kunne ikke sende beskeden. Prøv igen senere.' });
		}

		return { success: true };
	}
};
