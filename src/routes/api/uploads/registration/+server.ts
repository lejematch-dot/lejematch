import { uploadImagePublic } from '$lib/api/uploads';
import { API_BASE_URL } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Uautentificeret proxy — bruges kun til profilbilledet på registreringssiden,
// hvor der endnu ikke findes en konto/JWT. Rate-begrænset på Go-siden
// (PublicUploadLimiter).
export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file');

	if (!(file instanceof File)) {
		error(400, 'Ingen fil modtaget');
	}

	try {
		const result = await uploadImagePublic(file);
		return json({ url: `${API_BASE_URL}${result.url}` });
	} catch (e) {
		error(400, e instanceof Error ? e.message : 'Kunne ikke uploade billedet');
	}
};
