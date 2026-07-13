import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Permanent redirect — siden hedder nu /boliger. Bevarer evt. filter-parametre
// og eksisterende Google-placering/backlinks til den gamle URL.
export const load: PageServerLoad = ({ url }) => {
	redirect(301, `/boliger${url.search}`);
};
