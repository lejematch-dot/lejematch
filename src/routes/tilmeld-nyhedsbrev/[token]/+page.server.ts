import { subscribeNewsletter } from '$lib/api/newsletter';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		await subscribeNewsletter(params.token);
		return { success: true };
	} catch {
		return { success: false };
	}
};
