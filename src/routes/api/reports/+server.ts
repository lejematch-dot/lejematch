import { createReport } from '$lib/api/reports';
import type { CreateReportRequest } from '$lib/types/report';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
	if (!locals.user) error(401, 'Ikke logget ind');

	const token = cookies.get('session')!;
	const body = (await request.json()) as CreateReportRequest;

	try {
		const report = await createReport(body, token);
		return json(report);
	} catch {
		error(400, 'Kunne ikke indsende rapport');
	}
};
