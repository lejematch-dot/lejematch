<script lang="ts">
	import HowItWorksModal from '$lib/components/HowItWorksModal.svelte';
</script>

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
				bolig, lejer eller roomie
			</h1>
			<p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
				Udlejer du, eller leder du efter et sted at bo? LejeMatch bringer jer sammen ét sted, uden gebyrer og uden bøvl.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row sm:items-end gap-6">
			<div class="grid">
				<p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 text-center">
					Leder du efter et sted at bo?
				</p>
				<div class="flex flex-col sm:flex-row gap-0">
					<a
						href="/boliger?category=hele"
						class="flex-1 px-5 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-center whitespace-nowrap"
					>
						Bolig
					</a>
					<a
						href="/boliger?category=vaerelse"
						class="flex-1 px-5 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground border-t-0 sm:border-t-2 sm:border-l-0 hover:bg-foreground hover:text-background transition-colors text-center whitespace-nowrap"
					>
						Værelse
					</a>
				</div>
			</div>
			<div class="grid">
				<p class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 text-center">
					Udlejer du, eller søger du en roomie?
				</p>
				<div class="flex flex-col sm:flex-row gap-0">
					<a
						href="/lejere?category=hele"
						class="flex-1 px-5 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-center whitespace-nowrap"
					>
						Find boligsøgende
					</a>
					<a
						href="/lejere?category=vaerelse"
						class="flex-1 px-5 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground border-t-0 sm:border-t-2 sm:border-l-0 hover:bg-foreground hover:text-background transition-colors text-center whitespace-nowrap"
					>
						Find roomie
					</a>
				</div>
			</div>
			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="/register"
					class="px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors text-center"
				>
					Opret profil
				</a>
				<HowItWorksModal />
			</div>
		</div>
	</div>
</section>

<!-- Sådan virker det -->
<section class="bg-muted border-t border-b border-border py-16">
	<div class="max-w-7xl mx-auto px-6">
		<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-10 text-center">Sådan virker det</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
			<div>
				<p class="text-sm font-bold uppercase tracking-widest text-foreground mb-5 text-center sm:text-left">
					Udlejer
				</p>
				<div class="space-y-4">
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							1
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Opret en gratis profil</p>
					</div>
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							2
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Opret dit opslag med billeder og info om boligen</p>
					</div>
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							3
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Find din næste lejer eller roomie under "Lejere"</p>
					</div>
				</div>
			</div>

			<div>
				<p class="text-sm font-bold uppercase tracking-widest text-foreground mb-5 text-center sm:text-left">
					Lejer / Roomie
				</p>
				<div class="space-y-4">
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							1
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Opret en gratis profil</p>
					</div>
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							2
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Opret dit opslag med billeder og info om dig selv</p>
					</div>
					<div class="flex gap-4 items-start">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							3
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">Find din næste bolig eller roomie under "Boliger"</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
