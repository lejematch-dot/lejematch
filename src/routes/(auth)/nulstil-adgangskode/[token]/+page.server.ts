import { resetPassword } from '$lib/api/auth';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const newPassword = String(data.get('newPassword') ?? '');
		const confirmPassword = String(data.get('confirmPassword') ?? '');

		if (newPassword.length < 8) {
			return fail(400, { error: 'Adgangskoden skal være mindst 8 tegn.' });
		}
		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'Adgangskoderne stemmer ikke overens.' });
		}

		try {
			await resetPassword(params.token, newPassword);
		} catch {
			return fail(400, { error: 'Linket er ugyldigt eller udløbet. Bed om et nyt.' });
		}

		return { success: true };
	}
};
