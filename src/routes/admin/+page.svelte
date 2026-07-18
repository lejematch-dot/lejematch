<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const stats = $derived(data.stats);
</script>

<svelte:head>
	<title>Dashboard – LejeMatch</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Admin</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Dashboard</h1>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
		<div class="border border-border p-5">
			<p class="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Brugere</p>
			<p class="text-3xl font-bold text-foreground mb-1">{stats.TotalUsers}</p>
			<p class="text-xs text-muted-foreground">{stats.ActiveUsers} bekræftede</p>
			<p class="text-xs text-muted-foreground">+{stats.NewUsers7d} sidste 7 dage · +{stats.NewUsers30d} sidste 30 dage</p>
		</div>

		<div class="border border-border p-5">
			<p class="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Boligopslag</p>
			<p class="text-3xl font-bold text-foreground mb-1">{stats.TotalListings}</p>
			<p class="text-xs text-muted-foreground">
				{stats.ActiveListings} aktive · {stats.RentedListings} udlejet · {stats.ArchivedListings} arkiveret
			</p>
			<p class="text-xs text-muted-foreground">+{stats.NewListings7d} sidste 7 dage</p>
		</div>

		<div class="border border-border p-5">
			<p class="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Lejeropslag</p>
			<p class="text-3xl font-bold text-foreground mb-1">{stats.TotalSeekers}</p>
			<p class="text-xs text-muted-foreground">{stats.ActiveSeekers} aktive · {stats.ArchivedSeekers} arkiveret</p>
			<p class="text-xs text-muted-foreground">+{stats.NewSeekers7d} sidste 7 dage</p>
		</div>

		<div class="border border-border p-5">
			<p class="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Kontakter</p>
			<p class="text-3xl font-bold text-foreground mb-1">{stats.TotalContacts}</p>
			<p class="text-xs text-muted-foreground">
				+{stats.Contacts7d} sidste 7 dage · +{stats.Contacts30d} sidste 30 dage
			</p>
		</div>
	</div>

	<div class="border border-border p-5">
		<p class="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-4">Mest aktive byer (boligopslag)</p>
		{#if stats.TopCities.length === 0}
			<p class="text-sm text-muted-foreground">Ingen data endnu.</p>
		{:else}
			<div class="space-y-2">
				{#each stats.TopCities as city (city.City)}
					<div class="flex items-center justify-between text-sm">
						<span class="text-foreground">{city.City}</span>
						<span class="text-muted-foreground">{city.Count} opslag</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
