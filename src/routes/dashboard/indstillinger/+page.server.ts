import { getUser, getUserProfile, updateUserProfile, changePassword, deleteUser } from '$lib/api/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const [user, profile] = await Promise.all([
		getUser(locals.user.sub, token),
		getUserProfile(locals.user.sub)
	]);

	return { user, profile };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();

		try {
			await updateUserProfile(locals.user.sub, {
				DisplayName: String(data.get('DisplayName') ?? ''),
				Bio: String(data.get('Bio') ?? ''),
				City: String(data.get('City') ?? ''),
				ImageURL: String(data.get('ImageURL') ?? '')
			}, token);
		} catch {
			return fail(400, { action: 'profile', error: 'Kunne ikke opdatere profil.' });
		}

		return { action: 'profile', success: true };
	},

	changePassword: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();

		try {
			await changePassword(locals.user.sub, {
				CurrentPassword: String(data.get('CurrentPassword') ?? ''),
				NewPassword: String(data.get('NewPassword') ?? '')
			}, token);
		} catch {
			return fail(422, { action: 'password', error: 'Forkert adgangskode eller for kort ny adgangskode.' });
		}

		return { action: 'password', success: true };
	},

	deleteAccount: async ({ locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;

		try {
			await deleteUser(locals.user.sub, token);
		} catch {
			return fail(400, { action: 'delete', error: 'Kunne ikke slette konto.' });
		}

		cookies.delete('session', { path: '/' });
		redirect(302, '/');
	}
};
