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
			const result = await forgotPassword(email);
			return { success: true, accountExists: result.accountExists };
		} catch {
			return fail(400, { error: 'Kunne ikke sende linket. Prøv igen.' });
		}
	}
};
