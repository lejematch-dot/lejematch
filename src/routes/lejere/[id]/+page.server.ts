import { getFavorites } from '$lib/api/favorites';
import { contactSeeker, getSeeker } from '$lib/api/seekers';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Opslag ikke fundet');

	try {
		const seeker = await getSeeker(id);

		let isFavorite = false;
		if (locals.user) {
			const favorites = await getFavorites(cookies.get('session')!).catch(() => []);
			isFavorite = favorites.some((f) => f.FavoriteType === 'seeker' && f.FavoriteID === id);
		}

		return { seeker, isFavorite };
	} catch {
		error(404, 'Opslag ikke fundet');
	}
};

export const actions: Actions = {
	contact: async ({ request, params, locals, cookies }) => {
		if (!locals.user) return fail(401, { error: 'Log ind for at kontakte.' });

		const id = Number(params.id);
		if (isNaN(id)) error(404, 'Opslag ikke fundet');

		const token = cookies.get('session')!;
		const data = await request.formData();
		const senderPhone = String(data.get('senderPhone') ?? '');
		const message = String(data.get('message') ?? '');

		if (!message) {
			return fail(400, { error: 'Skriv en besked.' });
		}

		try {
			await contactSeeker(id, { senderPhone, message }, token);
		} catch (e) {
			console.error('KONTAKT FEJL:', e);
			return fail(500, { error: 'Kunne ikke sende beskeden. Prøv igen senere.' });
		}

		return { success: true };
	}
};
