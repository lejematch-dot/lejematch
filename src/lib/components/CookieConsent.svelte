<script lang="ts">
	import { GA_MEASUREMENT_ID } from '$lib/analytics';

	const COOKIE_NAME = 'cookie_consent';
	const COOKIE_DAYS = 180;

	let visible = $state(false);

	function getCookie(name: string): string | null {
		const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
		return match ? decodeURIComponent(match[1]) : null;
	}

	function setCookie(name: string, value: string, days: number) {
		const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
		document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
	}

	function gtag(...args: unknown[]) {
		const w = window as unknown as { dataLayer: unknown[] };
		w.dataLayer = w.dataLayer || [];
		w.dataLayer.push(args);
	}

	// Initialiserer GA i "consent mode": scriptet indlæses altid, men uden
	// samtykke sender Google kun anonyme, cookie-løse signaler (ingen
	// personhenførbar sporing). Uden dette eksplicitte default-kald dropper
	// Google typisk data helt fra EU-besøgende, selvom scriptet kører fint —
	// det var årsagen til at GA ikke viste nogen data.
	function initGoogleAnalytics(granted: boolean) {
		if (!GA_MEASUREMENT_ID || document.getElementById('ga-script')) {
			gtag('consent', 'update', {
				analytics_storage: granted ? 'granted' : 'denied'
			});
			return;
		}

		gtag('consent', 'default', {
			analytics_storage: granted ? 'granted' : 'denied',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied'
		});
		gtag('js', new Date());
		gtag('config', GA_MEASUREMENT_ID);

		const script = document.createElement('script');
		script.id = 'ga-script';
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);
	}

	$effect(() => {
		const consent = getCookie(COOKIE_NAME);
		if (consent === 'granted') {
			initGoogleAnalytics(true);
		} else if (consent === 'denied') {
			initGoogleAnalytics(false);
		} else {
			visible = true;
			initGoogleAnalytics(false);
		}
	});

	function accept() {
		setCookie(COOKIE_NAME, 'granted', COOKIE_DAYS);
		visible = false;
		gtag('consent', 'update', { analytics_storage: 'granted' });
	}

	function reject() {
		setCookie(COOKIE_NAME, 'denied', COOKIE_DAYS);
		visible = false;
	}
</script>

{#if visible}
	<div class="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border p-4 sm:p-6 shadow-lg">
		<div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-sm text-muted-foreground text-center sm:text-left">
				Vi bruger cookies til at måle trafik på siden med Google Analytics, så vi kan forbedre LejeMatch. Du kan
				altid ændre dit valg. Læs mere i vores
				<a href="/privatlivspolitik" class="underline text-foreground">privatlivspolitik</a>.
			</p>
			<div class="flex gap-2 shrink-0 justify-center">
				<button
					type="button"
					onclick={reject}
					class="px-4 py-2 text-xs font-bold uppercase tracking-wide border border-border hover:bg-muted transition-colors whitespace-nowrap"
				>
					Kun nødvendige
				</button>
				<button
					type="button"
					onclick={accept}
					class="px-4 py-2 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
				>
					Accepter
				</button>
			</div>
		</div>
	</div>
{/if}
