// Billeder kan have et fokuspunkt gemt i URL-fragmentet (fx "#pos=30,70"),
// sat af brugeren i ImageUploader. Fragmentet sendes aldrig til serveren, så
// det kræver ingen ændringer i databasen — det er ren visningslogik.

const POS_PATTERN = /#pos=([\d.]+),([\d.]+)$/;

export function getObjectPosition(url: string | undefined | null): string {
	if (!url) return '50% 50%';
	const match = url.match(POS_PATTERN);
	if (!match) return '50% 50%';
	return `${match[1]}% ${match[2]}%`;
}

export function getPositionCoords(url: string | undefined | null): { x: number; y: number } {
	if (!url) return { x: 50, y: 50 };
	const match = url.match(POS_PATTERN);
	if (!match) return { x: 50, y: 50 };
	return { x: Number(match[1]), y: Number(match[2]) };
}

export function withPosition(url: string, x: number, y: number): string {
	const base = url.replace(POS_PATTERN, '');
	const clampedX = Math.round(Math.min(100, Math.max(0, x)) * 10) / 10;
	const clampedY = Math.round(Math.min(100, Math.max(0, y)) * 10) / 10;
	return `${base}#pos=${clampedX},${clampedY}`;
}

export function stripPosition(url: string): string {
	return url.replace(POS_PATTERN, '');
}
