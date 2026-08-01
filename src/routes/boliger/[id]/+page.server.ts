import { getFavorites } from '$lib/api/favorites';
import { contactListing, getListing } from '$lib/api/listings';
import { getUserProfile } from '$lib/api/users';
import type { ContactRelationshipType, ContactEmployment } from '$lib/types/contact';
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

		const posterProfile = await getUserProfile(listing.UserID).catch(() => null);

		return { listing, isFavorite, posterProfile };
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
		const numPeople = Number(data.get('numPeople') ?? 1);
		const relationshipType = String(data.get('relationshipType') ?? '') as ContactRelationshipType;
		const ages = data.getAll('ages').map(Number);
		const employment = String(data.get('employment') ?? '') as ContactEmployment;
		const hasPets = data.get('hasPets') === 'true';

		if (!message) {
			return fail(400, { error: 'Skriv en besked.' });
		}
		if (!numPeople || numPeople < 1) {
			return fail(400, { error: 'Angiv antal personer.' });
		}
		const wantAges = Math.min(numPeople, 5);
		if (ages.length !== wantAges || ages.some((a) => !a || a < 1 || a > 120)) {
			return fail(400, { error: 'Angiv en gyldig alder pr. person.' });
		}
		if (!employment) {
			return fail(400, { error: 'Vælg beskæftigelse.' });
		}

		try {
			await contactListing(
				id,
				{
					senderPhone,
					message,
					numPeople,
					relationshipType: numPeople > 1 ? relationshipType : '',
					ages,
					employment,
					hasPets
				},
				token
			);
		} catch (e) {
			console.error('KONTAKT FEJL:', e);
			return fail(500, { error: 'Kunne ikke sende beskeden. Prøv igen senere.' });
		}

		return { success: true };
	}
};
