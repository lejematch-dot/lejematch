import { login, resendVerification } from '$lib/api/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(302, '/dashboard');
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');
		const password = String(data.get('password') ?? '');

		try {
			const { token } = await login(email, password);
			cookies.set('session', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
		} catch (e) {
			console.error('LOGIN FEJL:', e);

			const message = e instanceof Error ? e.message : '';
			if (message.includes('email_not_verified')) {
				return fail(403, {
					error: 'Bekræft din e-mail før du kan logge ind.',
					notVerified: true,
					email
				});
			}

			return fail(401, { error: 'Forkert e-mail eller adgangskode.' });
		}

		redirect(302, '/dashboard');
	},

	resend: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');

		try {
			await resendVerification(email);
		} catch {
			// Svarer altid succes til brugeren, uanset om det lykkedes —
			// undgår at afsløre om e-mailen findes.
		}

		return { resent: true };
	}
};
