import { createListing } from '$lib/api/listings';
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
		const price = Number(data.get('Price'));
		const city = String(data.get('City') ?? '');
		const zip = String(data.get('Zip') ?? '');
		const area = String(data.get('Area') ?? '');
		const roomType = String(data.get('RoomType') ?? 'private');
		const availableFrom = String(data.get('AvailableFrom') ?? '');
		const imagesRaw = String(data.get('Images') ?? '');

		if (!title || !description || !price || !city || !roomType || !availableFrom) {
			return fail(400, { error: 'Udfyld venligst alle påkrævede felter.' });
		}

		const images = imagesRaw
			.split('\n')
			.map((s) => s.trim())
			.filter(Boolean);

		try {
			await createListing(
				{ Title: title, Description: description, Price: price, City: city, Zip: zip, Area: area, RoomType: roomType as 'private' | 'shared' | 'apartment', AvailableFrom: availableFrom, Images: images },
				token
			);
		} catch {
			return fail(400, { error: 'Kunne ikke oprette opslag. Prøv igen.' });
		}

		redirect(302, '/dashboard');
	}
};
