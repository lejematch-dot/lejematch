import { getStats } from '$lib/api/stats';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');
	if (!locals.user.is_admin) error(403, 'Ingen adgang');

	const token = cookies.get('session')!;
	const stats = await getStats(token);

	return { stats };
};
