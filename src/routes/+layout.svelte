<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { CVR_NUMBER } from '$lib/legal';
	import { blogPosts } from '$lib/blog';
	import { DEFAULT_META, STATIC_ROUTE_META, NOINDEX_PREFIXES } from '$lib/seo';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	let mobileOpen = $state(false);
	let profileMenuOpen = $state(false);
	let profileMenuEl: HTMLElement | undefined = $state();

	const isActive = (path: string) => $page.url.pathname === path;
	const isProfileSection = $derived(isActive('/dashboard') || isActive('/dashboard/indstillinger'));

	const routeMeta = $derived.by(() => {
		const path = $page.url.pathname;
		const pageData = $page.data as Record<string, unknown>;

		if (STATIC_ROUTE_META[path]) return { ...DEFAULT_META, ...STATIC_ROUTE_META[path] };

		const post = blogPosts.find((p) => `/blog/${p.slug}` === path);
		if (post) return { ...DEFAULT_META, title: post.title, description: post.description };

		const listing = pageData?.listing as
			| { Title: string; City: string; Price: number }
			| undefined;
		if (listing && path.startsWith('/boliger/')) {
			return {
				...DEFAULT_META,
				title: `${listing.Title} – LejeMatch`,
				description: `Lejebolig i ${listing.City}: ${listing.Title}. ${listing.Price.toLocaleString('da-DK')} kr/md. Se billeder og kontakt udlejeren direkte og gratis på LejeMatch.`
			};
		}

		const seeker = pageData?.seeker as
			| { Title: string; City: string; MaxBudget: number }
			| undefined;
		if (seeker && path.startsWith('/lejere/')) {
			return {
				...DEFAULT_META,
				title: `${seeker.Title} – LejeMatch`,
				description: `Boligsøgende i ${seeker.City}: ${seeker.Title}. Max ${seeker.MaxBudget.toLocaleString('da-DK')} kr/md. Se profilen og kontakt lejeren direkte og gratis på LejeMatch.`
			};
		}

		const profile = pageData?.profile as { displayName: string } | undefined;
		if (profile && path.startsWith('/profil/')) {
			return {
				...DEFAULT_META,
				title: `${profile.displayName} – LejeMatch`,
				description: `Se ${profile.displayName}s profil på LejeMatch — opslag og kontaktmuligheder for lejere og udlejere, helt gratis.`
			};
		}

		return DEFAULT_META;
	});

	const isNoindex = $derived(NOINDEX_PREFIXES.some((prefix) => $page.url.pathname.startsWith(prefix)));
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
	<link rel="apple-touch-icon" href="/favicon-48.png" />
	<meta name="google-site-verification" content="DeBBtBA_GgaAW_B0OuWHANiK6oWOcKn1Rnin1yjUSKU" />
	<title>{routeMeta.title}</title>
	<meta name="description" content={routeMeta.description} />
	{#if isNoindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	<meta property="og:site_name" content="LejeMatch" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={routeMeta.title} />
	<meta property="og:description" content={routeMeta.description} />
	<meta property="og:image" content={routeMeta.image} />
	<meta property="og:url" content="https://lejematch.dk{$page.url.pathname}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={routeMeta.title} />
	<meta name="twitter:description" content={routeMeta.description} />
	<meta name="twitter:image" content={routeMeta.image} />
</svelte:head>

<svelte:window
	onclick={(e) => {
		if (profileMenuOpen && profileMenuEl && !profileMenuEl.contains(e.target as Node)) {
			profileMenuOpen = false;
		}
	}}
/>

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
					href="/boliger"
					class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/boliger') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					Boliger
				</a>

				<a
					href="/lejere"
					class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/lejere') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					Lejere
				</a>

				{#if data.user}
					<a
						href="/dashboard/favoritter"
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/dashboard/favoritter') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Favoritter
					</a>
					<a
						href="/dashboard/beskeder"
						class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/dashboard/beskeder') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						Beskeder
					</a>
					{#if data.user.is_admin}
						<a
							href="/admin/rapporter"
							class="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isActive('/admin/rapporter') ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
						>
							Rapporter
						</a>
					{/if}
					<div class="relative" bind:this={profileMenuEl}>
						<button
							type="button"
							onclick={() => (profileMenuOpen = !profileMenuOpen)}
							class="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 {isProfileSection ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}"
						>
							Min Profil
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						{#if profileMenuOpen}
							<div class="absolute right-0 top-full mt-1 w-44 bg-background border border-border shadow-lg z-10">
								<a
									href="/dashboard"
									onclick={() => (profileMenuOpen = false)}
									class="block px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide transition-colors {isActive('/dashboard') ? 'text-foreground bg-muted' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
								>
									Mine Opslag
								</a>
								<a
									href="/dashboard/indstillinger"
									onclick={() => (profileMenuOpen = false)}
									class="block px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide transition-colors {isActive('/dashboard/indstillinger') ? 'text-foreground bg-muted' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
								>
									Indstillinger
								</a>
								<form method="POST" action="/logout" use:enhance>
									<button
										type="submit"
										class="block w-full text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
									>
										Log ud
									</button>
								</form>
							</div>
						{/if}
					</div>
					<a
						href="/dashboard/opret"
						class="ml-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
					>
						+ Opret opslag
					</a>
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
						Opret profil
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
					href="/boliger"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/boliger') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
				>
					Boliger
				</a>
				<a
					href="/lejere"
					onclick={() => (mobileOpen = false)}
					class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/lejere') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
				>
					Lejere
				</a>
				{#if data.user}
					<a
						href="/dashboard/favoritter"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/dashboard/favoritter') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Favoritter
					</a>
					<a
						href="/dashboard/beskeder"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/dashboard/beskeder') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Beskeder
					</a>
					{#if data.user.is_admin}
						<a
							href="/admin/rapporter"
							onclick={() => (mobileOpen = false)}
							class="flex items-center gap-3 px-3 py-3 text-xs font-medium uppercase tracking-wide {isActive('/admin/rapporter') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
						>
							Rapporter
						</a>
					{/if}
					<p class="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">Min Profil</p>
					<a
						href="/dashboard"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-2.5 text-[10px] font-medium uppercase tracking-wide {isActive('/dashboard') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Mine Opslag
					</a>
					<a
						href="/dashboard/indstillinger"
						onclick={() => (mobileOpen = false)}
						class="flex items-center gap-3 px-3 py-2.5 text-[10px] font-medium uppercase tracking-wide {isActive('/dashboard/indstillinger') ? 'text-foreground bg-muted' : 'text-muted-foreground'}"
					>
						Indstillinger
					</a>
					<form method="POST" action="/logout" use:enhance>
						<button
							type="submit"
							class="flex items-center gap-3 px-3 py-2.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground w-full"
						>
							Log ud
						</button>
					</form>
					<a
						href="/dashboard/opret"
						onclick={() => (mobileOpen = false)}
						class="flex items-center justify-center mx-3 my-2 px-3 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest"
					>
						+ Opret opslag
					</a>
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
						Opret profil
					</a>
				{/if}
			</div>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-primary py-4 mt-auto">
		<div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
			<div class="flex flex-col items-center sm:items-start gap-0.5">
				<p class="text-[11px] text-primary-foreground/60">
					© {new Date().getFullYear()} LejeMatch{#if CVR_NUMBER}{' '}· CVR: {CVR_NUMBER}{/if}
				</p>
				<a
					href="mailto:kontakt@lejematch.dk"
					class="text-[11px] text-primary-foreground/60 hover:text-primary-foreground transition-colors"
				>
					kontakt@lejematch.dk
				</a>
			</div>
			<nav class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs font-medium uppercase tracking-widest text-primary-foreground/80">
				<a href="/om-os" class="hover:text-primary-foreground transition-colors">Om os</a>
				<a href="/blog" class="hover:text-primary-foreground transition-colors">Blog</a>
				<a href="/faq" class="hover:text-primary-foreground transition-colors">FAQ</a>
				<a href="/brugervilkaar" class="hover:text-primary-foreground transition-colors">Brugervilkår</a>
				<a href="/privatlivspolitik" class="hover:text-primary-foreground transition-colors">Privatlivspolitik</a>
			</nav>
		</div>
	</footer>
</div>

<CookieConsent />
