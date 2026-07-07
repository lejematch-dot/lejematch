import { createSeeker } from '$lib/api/seekers';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) redirect(302, '/login');
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();

		const title = String(data.get('Title') ?? '');
		const description = String(data.get('Description') ?? '');
		const city = String(data.get('City') ?? '');
		const maxBudget = Number(data.get('MaxBudget'));
		const roomType = String(data.get('RoomType') ?? 'private');
		const moveInFrom = String(data.get('MoveInFrom') ?? '');
		const images = data.getAll('Images').map(String).filter(Boolean);

		const seekingType = String(data.get('SeekingType') ?? '');
		const numPeopleRaw = String(data.get('NumPeople') ?? '');
		const numRoomsRaw = String(data.get('NumRooms') ?? '');
		const furnishedPreference = String(data.get('FurnishedPreference') ?? '');
		const rentalPeriod = String(data.get('RentalPeriod') ?? '');
		const rentalPeriodDetails = String(data.get('RentalPeriodDetails') ?? '');

		if (!title || !description || !city || !maxBudget || !roomType || !moveInFrom || !seekingType) {
			return fail(400, { error: 'Udfyld venligst alle påkrævede felter.' });
		}

		try {
			await createSeeker(
				{
					Title: title,
					Description: description,
					City: city,
					MaxBudget: maxBudget,
					RoomType: roomType as 'private' | 'shared' | 'apartment',
					MoveInFrom: moveInFrom,
					Images: images,
					SeekingType: (seekingType || undefined) as 'bolig' | 'roommate' | 'begge' | undefined,
					NumPeople: numPeopleRaw ? Number(numPeopleRaw) : undefined,
					NumRooms: numRoomsRaw ? Number(numRoomsRaw) : undefined,
					FurnishedPreference: (furnishedPreference || undefined) as
						| 'furnished'
						| 'unfurnished'
						| 'any'
						| undefined,
					RentalPeriod: (rentalPeriod || undefined) as 'unlimited' | 'limited' | undefined,
					RentalPeriodDetails: rentalPeriodDetails || undefined
				},
				token
			);
		} catch {
			return fail(400, { error: 'Kunne ikke oprette opslag. Prøv igen.' });
		}

		redirect(302, '/lejere');
	}
};
