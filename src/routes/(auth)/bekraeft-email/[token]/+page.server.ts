import { verifyEmail } from '$lib/api/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		await verifyEmail(params.token);
		return { success: true };
	} catch {
		return { success: false };
	}
};
