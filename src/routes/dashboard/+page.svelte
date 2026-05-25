<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard – LejeMatch</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Velkommen tilbage</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">{data.user?.email}</h1>
	</div>

	<section>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Dine opslag</h2>
			<a
				href="/dashboard/listings/new"
				class="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
			>
				+ Nyt opslag
			</a>
		</div>

		{#if data.listings.length === 0}
			<div class="border border-border p-12 text-center">
				<svg class="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				<p class="text-sm text-muted-foreground">Du har ingen aktive opslag endnu.</p>
				<a
					href="/dashboard/listings/new"
					class="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
				>
					Opret dit første opslag
				</a>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.listings as listing (listing.ID)}
					<div class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors">
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{listing.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">{listing.City} · {listing.Price.toLocaleString('da-DK')} kr/md.</p>
						</div>
						<div class="flex gap-2">
							<a
								href="/listings/{listing.ID}"
								class="border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors"
							>
								Se
							</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
