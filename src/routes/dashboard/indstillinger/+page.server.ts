import { getUser, getUserProfile, updateUser, updateUserProfile, changePassword, deleteUser } from '$lib/api/users';
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
	updateUser: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();

		const userData: Record<string, string> = {};
		const firstName = String(data.get('FirstName') ?? '');
		const lastName = String(data.get('LastName') ?? '');
		const email = String(data.get('Email') ?? '');
		const phone = String(data.get('Phone') ?? '');
		if (firstName) userData.FirstName = firstName;
		if (lastName) userData.LastName = lastName;
		if (email) userData.Email = email;
		if (phone) userData.Phone = phone;

		try {
			await updateUser(locals.user.sub, userData, token);
		} catch {
			return fail(400, { action: 'user', error: 'Kunne ikke opdatere brugeroplysninger.' });
		}

		return { action: 'user', success: true };
	},

	updateProfile: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');

		const token = cookies.get('session')!;
		const data = await request.formData();

		const profileData: Record<string, string> = {};
		const displayName = String(data.get('DisplayName') ?? '');
		const bio = String(data.get('Bio') ?? '');
		const city = String(data.get('City') ?? '');
		const imageURL = String(data.get('ImageURL') ?? '');
		if (displayName) profileData.DisplayName = displayName;
		if (bio) profileData.Bio = bio;
		if (city) profileData.City = city;
		if (imageURL) profileData.ImageURL = imageURL;

		try {
			await updateUserProfile(locals.user.sub, profileData, token);
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
