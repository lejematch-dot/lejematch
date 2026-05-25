<svelte:head>
	<title>LejeMatch – Find din næste bolig</title>
</svelte:head>

<!-- Hero -->
<section class="relative pt-28 pb-24 bg-background">
	<div class="max-w-7xl mx-auto px-6">
		<div class="max-w-3xl mb-16">
			<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
				Boligmarkedsplads for lejere
			</p>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 uppercase">
				Find din næste<br />
				lejlighed på <span class="text-primary">5 min</span>
			</h1>
			<p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
				Træt af uorganiserede Facebook-grupper? LejeMatch samler alt ét sted — gratis, simpelt og overskueligt.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-0 mb-24 max-w-sm">
			<a
				href="/listings"
				class="px-8 py-4 bg-foreground text-background font-semibold text-sm uppercase tracking-widest hover:bg-primary transition-colors text-center"
			>
				Se boliger
			</a>
			<a
				href="/register"
				class="px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground hover:border-primary hover:text-primary transition-colors text-center"
			>
				Opret konto
			</a>
		</div>

		<!-- Feature cards -->
		<div class="grid md:grid-cols-3 gap-px bg-border border border-border">
			<div class="p-8 bg-background hover:bg-muted transition-colors">
				<svg class="w-6 h-6 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				<h3 class="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Find Bolig</h3>
				<p class="text-sm text-muted-foreground leading-relaxed">Søg blandt hundredvis af lejligheder — hele boliger eller enkelt værelse.</p>
			</div>
			<div class="p-8 bg-background hover:bg-muted transition-colors">
				<svg class="w-6 h-6 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<h3 class="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Find Roommate</h3>
				<p class="text-sm text-muted-foreground leading-relaxed">Match med mennesker der søger det samme som dig.</p>
			</div>
			<div class="p-8 bg-background hover:bg-muted transition-colors">
				<svg class="w-6 h-6 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<h3 class="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">KBH & Aarhus</h3>
				<p class="text-sm text-muted-foreground leading-relaxed">Start i de største byer. Expansion til hele Danmark snart.</p>
			</div>
		</div>
	</div>
</section>

<!-- Problem section -->
<section class="py-24 border-t border-border">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<div>
				<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Problemet</p>
				<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">
					Det problem som ingen<br />har løst endnu
				</h2>
				<div class="space-y-8">
					{#each [
						{ title: 'Facebook kaos', desc: 'Over 10 grupper, uorganiseret, fuld af spam og falske annoncer.' },
						{ title: 'Dyre løsninger', desc: 'Boligportal.dk tager høje gebyrer og er kun for formelle lejligheder.' },
						{ title: 'Ingen fremlejemulighed', desc: 'Ingen nem måde at leje sin lejlighed eller værelse ud på ét sted.' }
					] as problem}
						<div class="flex gap-4 items-start">
							<div class="w-6 h-6 border-2 border-destructive flex items-center justify-center shrink-0 mt-0.5">
								<span class="text-destructive font-bold text-xs">✕</span>
							</div>
							<div>
								<h3 class="font-bold text-foreground text-sm uppercase tracking-wide">{problem.title}</h3>
								<p class="text-sm text-muted-foreground mt-1">{problem.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex justify-center">
				<div class="bg-muted border border-border p-12 text-center max-w-sm w-full">
					<p class="text-5xl mb-4">🔍</p>
					<p class="text-sm font-bold text-foreground uppercase tracking-wide">Uorganiseret boligmarked</p>
					<p class="text-sm text-muted-foreground mt-2">= spild af tid og energi</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Solution section -->
<section class="py-24 border-t border-border">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<div class="flex justify-center order-2 lg:order-1">
				<div class="bg-primary p-12 text-center max-w-sm w-full">
					<p class="text-5xl mb-4">✨</p>
					<p class="text-sm font-bold text-primary-foreground uppercase tracking-wide">LejeMatch</p>
					<p class="text-sm text-primary-foreground/70 mt-2">Én app, alle boliger</p>
				</div>
			</div>
			<div class="order-1 lg:order-2">
				<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Løsningen</p>
				<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">
					Hvad gør LejeMatch<br />anderledes
				</h2>
				<div class="space-y-8">
					{#each [
						{ title: 'Ét sted for alt', desc: 'Søg boliger, roommates og fremlejemuligheder alt på ét sted.' },
						{ title: '100% gratis', desc: 'Ingen gebyrer, ingen skjulte omkostninger.' },
						{ title: 'Overskueligt design', desc: 'Smart søgning, filtre og profiler — find hvad du søger på 5 min.' },
						{ title: 'iOS + Android', desc: 'Native app til begge platforme — kommer snart.' }
					] as solution}
						<div class="flex gap-4 items-start">
							<div class="w-6 h-6 border-2 border-primary flex items-center justify-center shrink-0 mt-0.5">
								<span class="text-primary font-bold text-xs">✓</span>
							</div>
							<div>
								<h3 class="font-bold text-foreground text-sm uppercase tracking-wide">{solution.title}</h3>
								<p class="text-sm text-muted-foreground mt-1">{solution.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA section -->
<section class="py-24 border-t border-border bg-foreground">
	<div class="max-w-7xl mx-auto px-6 text-center">
		<p class="text-xs font-medium tracking-widest uppercase text-background/50 mb-4">Kom i gang</p>
		<h2 class="text-3xl md:text-4xl font-bold text-background mb-8 uppercase tracking-tight">
			Find din næste bolig i dag
		</h2>
		<a
			href="/listings"
			class="inline-block px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
		>
			Se alle boliger
		</a>
	</div>
</section>
