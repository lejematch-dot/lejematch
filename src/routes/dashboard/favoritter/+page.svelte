<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Favoritter – LejeMatch</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Dashboard</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Favoritter</h1>
	</div>

	<section class="mb-10">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Boliger</h2>
		{#if data.listings.length === 0}
			<div class="border border-border p-8 text-center">
				<p class="text-sm text-muted-foreground">Du har ikke favoritmarkeret nogen boliger endnu.</p>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.listings as listing (listing.ID)}
					<a
						href="/listings/{listing.ID}"
						class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors"
					>
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{listing.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">
								{listing.City} · {listing.Price.toLocaleString('da-DK')} kr/md.
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<section>
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Lejere</h2>
		{#if data.seekers.length === 0}
			<div class="border border-border p-8 text-center">
				<p class="text-sm text-muted-foreground">Du har ikke favoritmarkeret nogen lejer-opslag endnu.</p>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.seekers as seeker (seeker.ID)}
					<a
						href="/lejere/{seeker.ID}"
						class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors"
					>
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{seeker.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">
								{seeker.City} · Max {seeker.MaxBudget.toLocaleString('da-DK')} kr/md.
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</div>
