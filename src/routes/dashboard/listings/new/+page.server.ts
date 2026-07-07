import { createListing } from '$lib/api/listings';
import type { Listing } from '$lib/types/listing';
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
		const images = data.getAll('Images').map(String).filter(Boolean);

		const listingKind = String(data.get('ListingKind') ?? '');
		const sizeSqmRaw = String(data.get('SizeSqm') ?? '');
		const depositRaw = String(data.get('Deposit') ?? '');
		const rentalPeriod = String(data.get('RentalPeriod') ?? '');
		const landlordType = String(data.get('LandlordType') ?? '');
		const furnishedPreference = String(data.get('FurnishedPreference') ?? '');
		const facilities = data.getAll('Facilities').map(String);
		const targetAudience = String(data.get('TargetAudience') ?? '');
		const facebookUrl = String(data.get('FacebookURL') ?? '');

		if (!title || !description || !price || !city || !roomType || !availableFrom) {
			return fail(400, { error: 'Udfyld venligst alle påkrævede felter.' });
		}

		try {
			await createListing(
				{
					Title: title,
					Description: description,
					Price: price,
					City: city,
					Zip: zip,
					Area: area,
					RoomType: roomType as 'private' | 'shared' | 'apartment',
					AvailableFrom: availableFrom,
					Images: images,
					ListingKind: (listingKind || undefined) as Listing['ListingKind'],
					SizeSqm: sizeSqmRaw ? Number(sizeSqmRaw) : undefined,
					Deposit: depositRaw ? Number(depositRaw) : undefined,
					RentalPeriod: (rentalPeriod || undefined) as Listing['RentalPeriod'],
					LandlordType: (landlordType || undefined) as Listing['LandlordType'],
					FurnishedPreference: (furnishedPreference || undefined) as Listing['FurnishedPreference'],
					Facilities: facilities.length ? facilities : undefined,
					TargetAudience: targetAudience || undefined,
					FacebookURL: facebookUrl || undefined
				},
				token
			);
		} catch {
			return fail(400, { error: 'Kunne ikke oprette opslag. Prøv igen.' });
		}

		redirect(302, '/dashboard');
	}
};
