import { updateContactCategory } from '$lib/api/contacts';
import type { ContactCategory } from '$lib/types/contact';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ request, params, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const id = Number(params.id);
	if (isNaN(id)) error(400, 'Ugyldigt id');

	const token = cookies.get('session')!;
	const { category } = await request.json();

	try {
		await updateContactCategory(id, category as ContactCategory, token);
		return json({ success: true });
	} catch {
		error(400, 'Kunne ikke opdatere markering');
	}
};
