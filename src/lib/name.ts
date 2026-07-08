// Forkorter et fulde navn til fornavn + initial(er) på efternavn,
// f.eks. "Biniam Teklay" -> "Biniam T.". Bruges til at vise udlejers/
// lejers navn for besøgende der ikke er logget ind.
export function abbreviateName(fullName: string): string {
	const parts = fullName.trim().split(/\s+/).filter(Boolean);
	if (parts.length <= 1) return fullName;

	const [first, ...rest] = parts;
	const initials = rest.map((part) => `${part[0]?.toUpperCase() ?? ''}.`).join(' ');
	return `${first} ${initials}`;
}
