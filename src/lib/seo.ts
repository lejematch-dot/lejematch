export const DEFAULT_META = {
	title: 'LejeMatch – Find din næste bolig',
	description:
		'LejeMatch samler lejeboliger og boligsøgende ét sted. Find en ledig lejebolig, eller opret dit eget opslag som boligsøgende — gratis, overskueligt og uden mellemled.',
	image: 'https://lejematch.dk/og-image.png'
};

export const STATIC_ROUTE_META: Record<string, { title: string; description: string }> = {
	'/blog': {
		title: 'Blog – LejeMatch',
		description: 'Guides og gode råd om boligmarkedet — bl.a. hvordan du undgår boligsvindel som lejer.'
	}
};
