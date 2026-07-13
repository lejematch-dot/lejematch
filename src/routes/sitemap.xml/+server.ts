import { getListings } from '$lib/api/listings';
import { getSeekers } from '$lib/api/seekers';
import { blogPosts } from '$lib/blog';

const SITE = 'https://lejematch.dk';

const STATIC_PATHS = [
	'/',
	'/boliger',
	'/lejere',
	'/om-os',
	'/blog',
	'/faq',
	'/brugervilkaar',
	'/privatlivspolitik'
];

async function fetchAllListingIds(): Promise<number[]> {
	const ids: number[] = [];
	let page = 1;
	while (true) {
		const res = await getListings({ page }).catch(() => null);
		if (!res || res.data.length === 0) break;
		ids.push(...res.data.map((l) => l.ID));
		if (page >= res.totalPages) break;
		page++;
	}
	return ids;
}

async function fetchAllSeekerIds(): Promise<number[]> {
	const ids: number[] = [];
	let page = 1;
	while (true) {
		const res = await getSeekers({ page }).catch(() => null);
		if (!res || res.data.length === 0) break;
		ids.push(...res.data.map((s) => s.ID));
		if (page >= res.totalPages) break;
		page++;
	}
	return ids;
}

export const GET = async () => {
	const [listingIds, seekerIds] = await Promise.all([fetchAllListingIds(), fetchAllSeekerIds()]);

	const urls = [
		...STATIC_PATHS.map((path) => `${SITE}${path}`),
		...blogPosts.map((post) => `${SITE}/blog/${post.slug}`),
		...listingIds.map((id) => `${SITE}/boliger/${id}`),
		...seekerIds.map((id) => `${SITE}/lejere/${id}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `	<url>\n\t\t<loc>${url}</loc>\n\t</url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
