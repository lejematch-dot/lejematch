import { getFavorites } from '$lib/api/favorites';
import { contactSeeker, getSeeker } from '$lib/api/seekers';
import { getUserProfile } from '$lib/api/users';
import type { ContactRelationshipType, ContactAgeRange, ContactEmployment } from '$lib/types/contact';
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

		const posterProfile = await getUserProfile(seeker.UserID).catch(() => null);

		return { seeker, isFavorite, posterProfile };
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
		const numPeople = Number(data.get('numPeople') ?? 1);
		const relationshipType = String(data.get('relationshipType') ?? '') as ContactRelationshipType;
		const ageRange = String(data.get('ageRange') ?? '') as ContactAgeRange;
		const employment = String(data.get('employment') ?? '') as ContactEmployment;

		if (!message) {
			return fail(400, { error: 'Skriv en besked.' });
		}
		if (!numPeople || numPeople < 1) {
			return fail(400, { error: 'Angiv antal personer.' });
		}
		if (!ageRange) {
			return fail(400, { error: 'Vælg et aldersinterval.' });
		}
		if (!employment) {
			return fail(400, { error: 'Vælg beskæftigelse.' });
		}

		try {
			await contactSeeker(
				id,
				{ senderPhone, message, numPeople, relationshipType: numPeople > 1 ? relationshipType : '', ageRange, employment },
				token
			);
		} catch (e) {
			console.error('KONTAKT FEJL:', e);
			return fail(500, { error: 'Kunne ikke sende beskeden. Prøv igen senere.' });
		}

		return { success: true };
	}
};
