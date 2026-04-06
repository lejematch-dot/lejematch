import { getListing } from '$lib/api/listings';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (isNaN(id)) error(404, 'Bolig ikke fundet');

	try {
		const listing = await getListing(id);
		return { listing };
	} catch {
		error(404, 'Bolig ikke fundet');
	}
};
