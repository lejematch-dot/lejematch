import { uploadImage } from '$lib/api/uploads';
import { API_BASE_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const token = cookies.get('session')!;
	const formData = await request.formData();
	const file = formData.get('file');

	if (!(file instanceof File)) {
		error(400, 'Ingen fil modtaget');
	}

	try {
		const result = await uploadImage(file, token);
		// The Go backend returns a path relative to itself (e.g. "/uploads/x.jpg").
		// Make it absolute so it resolves correctly wherever the image is later
		// rendered (this app's origin differs from the API's origin).
		return json({ url: `${API_BASE_URL}${result.url}` });
	} catch (e) {
		error(400, e instanceof Error ? e.message : 'Kunne ikke uploade billedet');
	}
};
