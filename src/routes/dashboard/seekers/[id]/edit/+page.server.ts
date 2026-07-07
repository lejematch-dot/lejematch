import { getSeeker, updateSeeker } from '$lib/api/seekers';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) redirect(302, '/login');

	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Opslag ikke fundet');

	let seeker;
	try {
		seeker = await getSeeker(id);
	} catch {
		error(404, 'Opslag ikke fundet');
	}

	if (seeker.UserID !== locals.user.sub) error(403, 'Du har ikke adgang til dette opslag');

	return { seeker };
};

export const actions: Actions = {
	default: async ({ request, params, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const id = Number(params.id);
		if (isNaN(id)) error(404, 'Opslag ikke fundet');

		const token = cookies.get('session')!;
		const data = await request.formData();

		const title = String(data.get('Title') ?? '');
		const description = String(data.get('Description') ?? '');
		const city = String(data.get('City') ?? '');
		const maxBudget = Number(data.get('MaxBudget'));
		const roomType = String(data.get('RoomType') ?? 'private');
		const status = String(data.get('Status') ?? 'active');
		const moveInFrom = String(data.get('MoveInFrom') ?? '');
		const images = data.getAll('Images').map(String).filter(Boolean);

		const seekingType = String(data.get('SeekingType') ?? '');
		const numPeopleRaw = String(data.get('NumPeople') ?? '');
		const furnishedPreference = String(data.get('FurnishedPreference') ?? '');
		const rentalPeriod = String(data.get('RentalPeriod') ?? '');
		const facebookUrl = String(data.get('FacebookURL') ?? '');

		if (!title || !description || !city || !maxBudget || !roomType || !moveInFrom) {
			return fail(400, { error: 'Udfyld venligst alle påkrævede felter.' });
		}

		try {
			await updateSeeker(
				id,
				{
					Title: title,
					Description: description,
					City: city,
					MaxBudget: maxBudget,
					RoomType: roomType as 'private' | 'shared' | 'apartment',
					Status: status as 'active' | 'rented' | 'archived',
					MoveInFrom: moveInFrom,
					Images: images,
					SeekingType: (seekingType || undefined) as 'bolig' | 'roommate' | undefined,
					NumPeople: numPeopleRaw ? Number(numPeopleRaw) : undefined,
					FurnishedPreference: (furnishedPreference || undefined) as
						| 'furnished'
						| 'unfurnished'
						| 'any'
						| undefined,
					RentalPeriod: (rentalPeriod || undefined) as 'unlimited' | 'limited' | undefined,
					FacebookURL: facebookUrl || undefined
				},
				token
			);
		} catch {
			return fail(400, { error: 'Kunne ikke gemme ændringerne. Prøv igen.' });
		}

		redirect(302, '/dashboard');
	}
};
