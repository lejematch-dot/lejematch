type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
	if (typeof window === 'undefined') return;
	const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
	gtag?.('event', name, params);
}
