import { createReply, getReplies } from '$lib/api/contacts';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const id = Number(params.id);
	if (isNaN(id)) error(400, 'Ugyldigt id');

	const token = cookies.get('session')!;

	try {
		const replies = await getReplies(id, token);
		return json(replies);
	} catch {
		error(400, 'Kunne ikke hente svar');
	}
};

export const POST: RequestHandler = async ({ request, params, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const id = Number(params.id);
	if (isNaN(id)) error(400, 'Ugyldigt id');

	const token = cookies.get('session')!;
	const { message } = await request.json();

	if (!message || !String(message).trim()) {
		error(400, 'Skriv en besked');
	}

	try {
		const reply = await createReply(id, message, token);
		return json(reply);
	} catch {
		error(400, 'Kunne ikke sende svar');
	}
};
