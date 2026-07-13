import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Permanent redirect — siden hedder nu /boliger/[id].
export const load: PageServerLoad = ({ params }) => {
	redirect(301, `/boliger/${params.id}`);
};
