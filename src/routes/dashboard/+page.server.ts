import { deleteListing, getUserListings } from '$lib/api/listings';
import { deleteSeeker, getUserSeekers } from '$lib/api/seekers';
import { getUser } from '$lib/api/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const [listings, seekers, me] = await Promise.all([
		getUserListings(locals.user.sub, token),
		getUserSeekers(locals.user.sub, token),
		getUser(locals.user.sub, token).catch(() => null)
	]);

	return { user: locals.user, firstName: me?.FirstName ?? '', listings, seekers };
};

export const actions: Actions = {
	deleteListing: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();
		const id = Number(data.get('id'));

		try {
			await deleteListing(id, token);
		} catch {
			return fail(400, { error: 'Kunne ikke slette opslaget.' });
		}

		return { success: true };
	},

	deleteSeeker: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();
		const id = Number(data.get('id'));

		try {
			await deleteSeeker(id, token);
		} catch {
			return fail(400, { error: 'Kunne ikke slette opslaget.' });
		}

		return { success: true };
	}
};
