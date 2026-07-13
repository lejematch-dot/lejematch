export const DEFAULT_META = {
	title: 'LejeMatch – Gratis lejeboligportal for lejere og udlejere',
	description:
		'Find din næste lejebolig gratis på LejeMatch. Vi samler lejere og udlejere ét sted — opret opslag, søg boliger og kontakt hinanden direkte, helt gratis.',
	image: 'https://lejematch.dk/og-image.png'
};

export const STATIC_ROUTE_META: Record<string, { title: string; description: string }> = {
	'/listings': {
		title: 'Ledige lejeboliger til leje – LejeMatch',
		description:
			'Se ledige lejeboliger i hele Danmark. Filtrér på by, pris og boligtype, og kontakt udlejeren direkte og gratis på LejeMatch.'
	},
	'/lejere': {
		title: 'Lejere søger bolig – LejeMatch',
		description:
			'Se opslag fra lejere, der søger en lejebolig eller et værelse. Find din næste roommate, eller udlej direkte til en seriøs lejer.'
	},
	'/om-os': {
		title: 'Om os – LejeMatch',
		description:
			'Læs historien bag LejeMatch — bygget for at gøre det gratis og nemt for lejere og udlejere at finde hinanden i Danmark.'
	},
	'/blog': {
		title: 'Blog – LejeMatch',
		description: 'Guides og gode råd om boligmarkedet — bl.a. hvordan du undgår boligsvindel som lejer.'
	},
	'/faq': {
		title: 'Ofte stillede spørgsmål – LejeMatch',
		description: 'Svar på de mest almindelige spørgsmål om at leje, udleje og bruge LejeMatch gratis og trygt.'
	},
	'/brugervilkaar': {
		title: 'Brugervilkår – LejeMatch',
		description:
			'Læs LejeMatchs brugervilkår for udlejere og lejere, der bruger platformen til at finde eller udleje en lejebolig.'
	},
	'/privatlivspolitik': {
		title: 'Privatlivspolitik – LejeMatch',
		description:
			'Læs hvordan LejeMatch behandler dine personoplysninger, når du bruger platformen som lejer eller udlejer.'
	},
	'/login': {
		title: 'Log ind – LejeMatch',
		description: 'Log ind på din gratis LejeMatch-konto for at søge lejeboliger og kontakte lejere og udlejere direkte.'
	},
	'/register': {
		title: 'Opret gratis profil – LejeMatch',
		description: 'Opret en gratis profil på LejeMatch, og kom i gang med at finde eller udleje en lejebolig i dag.'
	}
};

// Stier hvor undersider ikke skal indekseres af Google — private/administrative
// sider, der ikke skal optage crawl-budget eller dukke op i søgeresultater.
export const NOINDEX_PREFIXES = ['/dashboard', '/admin', '/lejere/ny', '/logout'];
