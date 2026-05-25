import { login } from '$lib/api/auth';
import { registerUser } from '$lib/api/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(302, '/dashboard');
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const firstName = String(data.get('firstName') ?? '');
		const lastName = String(data.get('lastName') ?? '');
		const email = String(data.get('email') ?? '');
		const phone = String(data.get('phone') ?? '');
		const password = String(data.get('password') ?? '');
		const city = String(data.get('city') ?? '');

		try {
			await registerUser({ FirstName: firstName, LastName: lastName, Email: email, Phone: phone, Password: password, City: city });
			const { token } = await login(email, password);
			cookies.set('session', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
		} catch {
			return fail(400, { error: 'Kunne ikke oprette konto. Prøv igen.' });
		}

		redirect(302, '/dashboard');
	}
};
