export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	dateLabel: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'saadan-undgaar-du-boligsvindel',
		title: 'Sådan undgår du boligsvindel — guide til lejere',
		description:
			'Undgå boligsvindel og falske boligannoncer. Se de typiske svindelmetoder, røde flag og hvad loven siger om depositum og forudbetalt leje.',
		dateLabel: '8. juli 2026'
	}
];
