import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Guide-siden er midlertidigt skjult, mens den færdiggøres.
// Fjern denne fil for at gøre siden tilgængelig igen.
export const load: PageServerLoad = () => {
	redirect(302, '/');
};
