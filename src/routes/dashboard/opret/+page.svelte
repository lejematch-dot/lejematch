<svelte:head>
	<title>Nyt opslag – LejeMatch</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	<a
		href="/dashboard"
		class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Tilbage
	</a>

	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Mine Opslag</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Nyt opslag</h1>
		<p class="text-sm text-muted-foreground mt-2">Hvilken type opslag vil du oprette?</p>
	</div>

	<div class="grid sm:grid-cols-2 gap-px bg-border border border-border">
		<a href="/dashboard/listings/new" class="group bg-background hover:bg-muted transition-colors p-8 text-center">
			<svg class="w-8 h-8 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Bolig</h2>
			<p class="text-sm text-muted-foreground">Jeg har en bolig eller et værelse, jeg vil leje ud.</p>
		</a>
		<a href="/lejere/ny" class="group bg-background hover:bg-muted transition-colors p-8 text-center">
			<svg class="w-8 h-8 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Lejer</h2>
			<p class="text-sm text-muted-foreground">Jeg søger selv et sted at bo.</p>
		</a>
	</div>
</div>
