import { getUserListings } from '$lib/api/listings';
import { getUserSeekers } from '$lib/api/seekers';
import { getUserProfile } from '$lib/api/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(400, 'Ugyldigt bruger-id');

	try {
		const [profile, allListings, allSeekers] = await Promise.all([
			getUserProfile(id),
			getUserListings(id),
			getUserSeekers(id).catch(() => [])
		]);
		const listings = allListings.filter((l) => l.Status === 'active');
		const seekers = allSeekers.filter((s) => s.Status === 'active');
		return { profile, listings, seekers, profileUserId: id };
	} catch (e: unknown) {
		if (typeof e === 'object' && e !== null && 'status' in e && (e as { status: number }).status === 404) {
			error(404, 'Profil ikke fundet');
		}
		throw e;
	}
};
