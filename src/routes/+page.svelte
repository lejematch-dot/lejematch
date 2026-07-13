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
				lejebolig eller lejer
			</h1>
			<p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
				Udlejer du, eller leder du efter et sted at bo? LejeMatch bringer jer sammen ét sted, uden gebyrer og uden bøvl.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-3">
			<div class="flex flex-col sm:flex-row gap-0">
				<a
					href="/boliger"
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
			<HowItWorksModal />
		</div>
	</div>
</section>

