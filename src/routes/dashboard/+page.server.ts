import { getListings } from '$lib/api/listings';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const result = await getListings({}, token);
	const userListings = result.data.filter((l) => l.UserID === locals.user!.UserID);

	return { user: locals.user, listings: userListings };
};
