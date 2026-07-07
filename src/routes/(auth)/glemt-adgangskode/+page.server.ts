import { forgotPassword } from '$lib/api/auth';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '');

		if (!email) {
			return fail(400, { error: 'Angiv din e-mail.' });
		}

		try {
			await forgotPassword(email);
		} catch {
			// Svarer altid succes — undgår at afsløre om e-mailen findes.
		}

		return { success: true };
	}
};
