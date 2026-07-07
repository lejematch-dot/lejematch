import { getListing, updateListing } from '$lib/api/listings';
import type { Listing } from '$lib/types/listing';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) redirect(302, '/login');

	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Opslag ikke fundet');

	let listing: Listing;
	try {
		listing = await getListing(id);
	} catch {
		error(404, 'Opslag ikke fundet');
	}

	if (listing.UserID !== locals.user.sub) error(403, 'Du har ikke adgang til dette opslag');

	return { listing };
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
		const price = Number(data.get('Price'));
		const city = String(data.get('City') ?? '');
		const zip = String(data.get('Zip') ?? '');
		const area = String(data.get('Area') ?? '');
		const roomType = String(data.get('RoomType') ?? 'private');
		const status = String(data.get('Status') ?? 'active');
		const availableFrom = String(data.get('AvailableFrom') ?? '');
		const images = data.getAll('Images').map(String).filter(Boolean);

		const listingKind = String(data.get('ListingKind') ?? '');
		const sizeSqmRaw = String(data.get('SizeSqm') ?? '');
		const depositRaw = String(data.get('Deposit') ?? '');
		const rentalPeriod = String(data.get('RentalPeriod') ?? '');
		const rentalPeriodDetails = String(data.get('RentalPeriodDetails') ?? '');
		const landlordType = String(data.get('LandlordType') ?? '');
		const furnishedPreference = String(data.get('FurnishedPreference') ?? '');
		const facilities = data.getAll('Facilities').map(String);
		const targetAudience = String(data.get('TargetAudience') ?? '');
		const roommatesWantedRaw = String(data.get('RoommatesWanted') ?? '');

		if (!title || !description || !price || !city || !roomType || !availableFrom) {
			return fail(400, { error: 'Udfyld venligst alle påkrævede felter.' });
		}
		if (images.length < 5) {
			return fail(400, { error: 'Tilføj mindst 5 billeder.' });
		}

		try {
			await updateListing(
				id,
				{
					Title: title,
					Description: description,
					Price: price,
					City: city,
					Zip: zip,
					Area: area,
					RoomType: roomType as 'private' | 'shared' | 'apartment',
					Status: status as 'active' | 'rented' | 'archived',
					AvailableFrom: availableFrom,
					Images: images,
					ListingKind: (listingKind || undefined) as Listing['ListingKind'],
					SizeSqm: sizeSqmRaw ? Number(sizeSqmRaw) : undefined,
					Deposit: depositRaw ? Number(depositRaw) : undefined,
					RentalPeriod: (rentalPeriod || undefined) as Listing['RentalPeriod'],
					RentalPeriodDetails: rentalPeriodDetails || undefined,
					LandlordType: (landlordType || undefined) as Listing['LandlordType'],
					FurnishedPreference: (furnishedPreference || undefined) as Listing['FurnishedPreference'],
					Facilities: facilities.length ? facilities : undefined,
					TargetAudience: targetAudience || undefined,
					RoommatesWanted: roommatesWantedRaw ? Number(roommatesWantedRaw) : undefined
				},
				token
			);
		} catch {
			return fail(400, { error: 'Kunne ikke gemme ændringerne. Prøv igen.' });
		}

		redirect(302, '/dashboard');
	}
};
