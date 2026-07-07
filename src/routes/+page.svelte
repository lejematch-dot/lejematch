<svelte:head>
	<title>LejeMatch – Find din næste bolig</title>
</svelte:head>

<!-- Hero -->
<section class="relative pt-28 pb-24 bg-background overflow-hidden">
	<div
		class="pointer-events-none absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl"
		aria-hidden="true"
	></div>

	<div class="relative max-w-7xl mx-auto px-6">
		<div class="max-w-3xl mb-16">
			<div class="w-12 h-1 bg-primary mb-6"></div>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 uppercase">
				Find din næste<br />
				bolig eller lejer
			</h1>
			<p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
				Udlejer du, eller leder du efter et sted at bo? LejeMatch bringer jer sammen ét sted, uden gebyrer og uden bøvl.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-3">
			<div class="flex flex-col sm:flex-row gap-0">
				<a
					href="/listings"
					class="px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-center"
				>
					Se boliger
				</a>
				<a
					href="/lejere"
					class="px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground border-t-0 sm:border-t-2 sm:border-l-0 hover:bg-foreground hover:text-background transition-colors text-center"
				>
					Se lejere
				</a>
			</div>
			<a
				href="/register"
				class="px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors text-center"
			>
				Opret profil
			</a>
		</div>
	</div>
</section>

<!-- Info section -->
<section class="py-14 border-t border-border bg-primary">
	<div class="max-w-7xl mx-auto px-6">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-6">
			<div class="flex items-center gap-2">
				<div class="w-7 h-7 border border-primary-foreground flex items-center justify-center">
					<svg class="w-3.5 h-3.5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
				</div>
				<span class="text-xs font-bold text-primary-foreground tracking-widest uppercase">LejeMatch</span>
			</div>
			<nav class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-widest text-primary-foreground/80">
				<a href="/om-os" class="hover:text-primary-foreground transition-colors">Om os</a>
				<a href="/faq" class="hover:text-primary-foreground transition-colors">FAQ</a>
				<a href="/privatlivspolitik" class="hover:text-primary-foreground transition-colors">Privatlivspolitik</a>
			</nav>
		</div>
	</div>
</section>
