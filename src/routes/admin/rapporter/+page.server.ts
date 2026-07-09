import { deleteListing, getListing } from '$lib/api/listings';
import { getReports, resolveReport } from '$lib/api/reports';
import { deleteSeeker, getSeeker } from '$lib/api/seekers';
import { deleteUser, getUserProfile } from '$lib/api/users';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');
	if (!locals.user.is_admin) error(403, 'Ingen adgang');

	const token = cookies.get('session')!;
	const reports = await getReports(token);

	const enriched = await Promise.all(
		reports.map(async (report) => {
			const [reporterProfile, target] = await Promise.all([
				getUserProfile(report.ReporterID).catch(() => null),
				report.TargetType === 'listing'
					? getListing(report.TargetID).catch(() => null)
					: report.TargetType === 'seeker'
						? getSeeker(report.TargetID).catch(() => null)
						: getUserProfile(report.TargetID).catch(() => null)
			]);

			const targetTitle =
				report.TargetType === 'profile'
					? ((target as { displayName?: string } | null)?.displayName ?? null)
					: ((target as { Title?: string } | null)?.Title ?? null);

			const targetUrl =
				report.TargetType === 'listing'
					? `/listings/${report.TargetID}`
					: report.TargetType === 'seeker'
						? `/lejere/${report.TargetID}`
						: `/profil/${report.TargetID}`;

			return { report, reporterProfile, targetTitle, targetUrl };
		})
	);

	return { reports: enriched };
};

export const actions: Actions = {
	resolve: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');
		if (!locals.user.is_admin) error(403, 'Ingen adgang');

		const data = await request.formData();
		const id = Number(data.get('id'));
		if (isNaN(id)) return fail(400, { error: 'Ugyldigt id' });

		const token = cookies.get('session')!;
		try {
			await resolveReport(id, token);
		} catch {
			return fail(400, { error: 'Kunne ikke opdatere rapporten.' });
		}

		return { success: true };
	},

	deleteTarget: async ({ request, locals, cookies }) => {
		if (!locals.user) redirect(302, '/login');
		if (!locals.user.is_admin) error(403, 'Ingen adgang');

		const data = await request.formData();
		const reportId = Number(data.get('reportId'));
		const targetType = String(data.get('targetType') ?? '');
		const targetId = Number(data.get('targetId'));
		if (isNaN(reportId) || isNaN(targetId)) return fail(400, { error: 'Ugyldigt id' });

		const token = cookies.get('session')!;
		try {
			if (targetType === 'listing') await deleteListing(targetId, token);
			else if (targetType === 'seeker') await deleteSeeker(targetId, token);
			else if (targetType === 'profile') await deleteUser(targetId, token);
			else return fail(400, { error: 'Ukendt type.' });
		} catch {
			return fail(400, { error: 'Kunne ikke slette.' });
		}

		await resolveReport(reportId, token).catch(() => {});

		return { success: true };
	}
};
