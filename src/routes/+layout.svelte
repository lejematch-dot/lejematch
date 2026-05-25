<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	let mobileOpen = $state(false);

	const isActive = (path: string) => $page.url.pathname === path;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background flex flex-col">
	<header class="sticky top-0 z-50 bg-background border-b border-border">
		<nav class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
			<a href="/" class="flex items-center gap-2">
				<div class="w-7 h-7 bg-primary flex items-center justify-center">
					<svg class="w-3.5 h-3.5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
				</div>
				<span class="text-xs font-bold text-foreground tracking-widest uppercase">LejeMatch</span>
			</a>

			<div class="hidden md:flex items-center gap-0">
				<a
					href="/listings"
					class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/listings') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					Boliger
				</a>

				{#if data.user}
					<a
						href="/dashboard"
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/dashboard') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Dashboard
					</a>
					<a
						href="/dashboard/indstillinger"
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/dashboard/indstillinger') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Indstillinger
					</a>
					<form method="POST" action="/logout" use:enhance>
						<button
							type="submit"
							class="ml-2 flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
						>
							Log ud
						</button>
					</form>
				{:else}
					<a
						href="/login"
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/login') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Log ind
					</a>
					<a
						href="/register"
						class="ml-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
					>
						Opret konto
					</a>
				{/if}
			</div>

			<button class="md:hidden p-2" onclick={() => (mobileOpen = !mobileOpen)}>
				{#if mobileOpen}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</nav>

		{#if mobileOpen}
			<div class="md:hidden border-t border-border bg-background px-4 py-3 space-y-0">
				<a
					href="/listings"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/listings') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
				>
					Boliger
				</a>
				{#if data.user}
					<a
						href="/dashboard"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/dashboard') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Dashboard
					</a>
					<a
						href="/dashboard/indstillinger"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/dashboard/indstillinger') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Indstillinger
					</a>
					<form method="POST" action="/logout" use:enhance>
						<button
							type="submit"
							class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground w-full"
						>
							Log ud
						</button>
					</form>
				{:else}
					<a
						href="/login"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground"
					>
						Log ind
					</a>
					<a
						href="/register"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide text-primary"
					>
						Opret konto
					</a>
				{/if}
			</div>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-border py-6 mt-auto">
		<div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} LejeMatch</p>
			<div class="flex gap-4 text-sm">
				<a href="/privatlivspolitik" class="text-muted-foreground hover:text-foreground transition-colors">
					Privatlivspolitik
				</a>
			</div>
		</div>
	</footer>
</div>
