export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	dateLabel: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'saadan-skriver-du-en-boligannonce-der-faar-svar',
		title: 'Sådan skriver du en boligannonce, der får svar',
		description:
			'Få flere seriøse henvendelser på din boligannonce. Se konkrete råd om billeder, tekst, prissætning og depositum som udlejer.',
		dateLabel: '9. juli 2026'
	},
	{
		slug: 'tjekliste-foer-du-underskriver-lejekontrakten',
		title: 'Tjekliste før du underskriver lejekontrakten',
		description:
			'Få styr på lejekontrakten, før du skriver under. Se hvad du skal tjekke om depositum, § 11, vedligeholdelse og indflytningsrapport.',
		dateLabel: '9. juli 2026'
	},
	{
		slug: 'saadan-undgaar-du-boligsvindel',
		title: 'Sådan undgår du boligsvindel — guide til lejere',
		description:
			'Undgå boligsvindel og falske boligannoncer. Se de typiske svindelmetoder, røde flag og hvad loven siger om depositum og forudbetalt leje.',
		dateLabel: '8. juli 2026'
	}
];
