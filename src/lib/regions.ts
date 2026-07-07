// Grov opdeling af danske byer i landsdele, brugt til at gruppere by-filteret.
// Byer der ikke er i listen, havner i "Andre byer" i stedet for at forsvinde.

const SJAELLAND = [
	'københavn',
	'frederiksberg',
	'roskilde',
	'køge',
	'slagelse',
	'næstved',
	'helsingør',
	'hillerød',
	'holbæk',
	'ringsted',
	'nykøbing falster',
	'frederikssund',
	'vordingborg',
	'rødovre',
	'gladsaxe',
	'lyngby',
	'kongens lyngby',
	'taastrup',
	'ballerup',
	'glostrup',
	'hvidovre',
	'ishøj',
	'greve',
	'solrød',
	'rønne'
];

const FYN = ['odense', 'svendborg', 'middelfart', 'nyborg', 'kerteminde', 'assens', 'faaborg', 'ringe', 'nørre aaby'];

const JYLLAND = [
	'aarhus',
	'århus',
	'aalborg',
	'ålborg',
	'esbjerg',
	'randers',
	'kolding',
	'horsens',
	'vejle',
	'herning',
	'silkeborg',
	'viborg',
	'holstebro',
	'fredericia',
	'skive',
	'haderslev',
	'sønderborg',
	'hjørring',
	'frederikshavn',
	'thisted',
	'ikast',
	'grenaa',
	'ringkøbing',
	'struer',
	'brande',
	'skanderborg',
	'tønder',
	'aabenraa'
];

export type Region = 'Sjælland' | 'Fyn' | 'Jylland' | 'Andre byer';

export function getRegion(city: string): Region {
	const key = city.trim().toLowerCase();
	if (SJAELLAND.includes(key)) return 'Sjælland';
	if (FYN.includes(key)) return 'Fyn';
	if (JYLLAND.includes(key)) return 'Jylland';
	return 'Andre byer';
}

export function groupCitiesByRegion(cities: string[]): Array<{ region: Region; cities: string[] }> {
	const order: Region[] = ['Sjælland', 'Fyn', 'Jylland', 'Andre byer'];
	const groups = new Map<Region, string[]>();

	for (const city of cities) {
		const region = getRegion(city);
		if (!groups.has(region)) groups.set(region, []);
		groups.get(region)!.push(city);
	}

	return order.filter((region) => groups.has(region)).map((region) => ({ region, cities: groups.get(region)! }));
}
