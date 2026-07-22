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
		const imageURL = String(data.get('ImageURL') ?? '');
		const acceptTerms = data.get('acceptTerms') === 'on';
		const newsletterOptIn = data.get('newsletterOptIn') === 'on';

		if (!imageURL) {
			return fail(400, { error: 'Tilføj et profilbillede.' });
		}

		if (!acceptTerms) {
			return fail(400, { error: 'Du skal acceptere brugervilkår og privatlivspolitik for at oprette en profil.' });
		}

		try {
			await registerUser({
				FirstName: firstName,
				LastName: lastName,
				Email: email,
				Phone: phone,
				Password: password,
				City: city,
				ImageURL: imageURL,
				UserType: 'tenant',
				NewsletterOptIn: newsletterOptIn
			});
		} catch (e) {
			const status = e instanceof Error && 'status' in e ? (e as Error & { status: number }).status : 0;
			const error =
				status === 409
					? 'E-mailen eller telefonnummeret er allerede i brug af en anden konto.'
					: 'Kunne ikke oprette konto. Prøv igen.';
			return fail(400, { error });
		}

		// Kontoen er aktiv med det samme — log brugeren ind automatisk.
		try {
			const { token } = await login(email, password);
			cookies.set('session', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
		} catch {
			redirect(302, '/login');
		}

		redirect(302, '/dashboard');
	}
};
