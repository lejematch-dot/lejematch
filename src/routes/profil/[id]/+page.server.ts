import { getUserListings } from '$lib/api/listings';
import { getUserProfile } from '$lib/api/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(400, 'Ugyldigt bruger-id');

	try {
		const [profile, allListings] = await Promise.all([
			getUserProfile(id),
			getUserListings(id)
		]);
		const listings = allListings.filter((l) => l.Status === 'active');
		return { profile, listings };
	} catch (e: unknown) {
		if (typeof e === 'object' && e !== null && 'status' in e && (e as { status: number }).status === 404) {
			error(404, 'Profil ikke fundet');
		}
		throw e;
	}
};
