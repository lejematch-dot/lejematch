import { getUserListings } from '$lib/api/listings';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const listings = await getUserListings(locals.user.sub, token);

	return { user: locals.user, listings };
};
