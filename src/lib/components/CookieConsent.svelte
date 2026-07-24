<script lang="ts">
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

	function updateConsent(granted: boolean) {
		const w = window as unknown as { gtag?: (...args: unknown[]) => void };
		w.gtag?.('consent', 'update', {
			analytics_storage: granted ? 'granted' : 'denied'
		});
	}

	$effect(() => {
		if (getCookie(COOKIE_NAME) === null) {
			visible = true;
		}
	});

	function accept() {
		setCookie(COOKIE_NAME, 'granted', COOKIE_DAYS);
		visible = false;
		updateConsent(true);
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
