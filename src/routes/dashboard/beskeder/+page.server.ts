import { getContacts } from '$lib/api/contacts';
import { getListing } from '$lib/api/listings';
import { getSeeker } from '$lib/api/seekers';
import { getUserProfile } from '$lib/api/users';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) redirect(302, '/login');

	const token = cookies.get('session')!;
	const contacts = await getContacts(token);

	const enriched = await Promise.all(
		contacts.map(async (contact) => {
			const [senderProfile, target] = await Promise.all([
				getUserProfile(contact.SenderID).catch(() => null),
				contact.TargetType === 'listing'
					? getListing(contact.TargetID).catch(() => null)
					: getSeeker(contact.TargetID).catch(() => null)
			]);

			return {
				contact,
				senderProfile,
				targetTitle: target?.Title ?? null,
				targetUrl:
					contact.TargetType === 'listing'
						? `/listings/${contact.TargetID}`
						: `/lejere/${contact.TargetID}`
			};
		})
	);

	return { contacts: enriched };
};
