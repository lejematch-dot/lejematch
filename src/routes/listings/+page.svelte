<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let showFilters = $state(false);
	let city = $state('');
	let minPrice = $state('');
	let maxPrice = $state('');
	let roomType = $state('');

	const roomTypeLabel: Record<string, string> = {
		private: 'Privat værelse',
		shared: 'Delt værelse',
		apartment: 'Lejlighed'
	};

	const activeFilterCount = $derived(
		[city, minPrice, maxPrice, roomType].filter(Boolean).length
	);
	const filtersVisible = $derived(showFilters || activeFilterCount > 0);

	function buildUrl() {
		const params = new URLSearchParams();
		if (city) params.set('city', city);
		if (minPrice) params.set('minPrice', minPrice);
		if (maxPrice) params.set('maxPrice', maxPrice);
		if (roomType) params.set('roomType', roomType);
		const qs = params.toString();
		return `/listings${qs ? `?${qs}` : ''}`;
	}

	function resetFilters() {
		city = '';
		minPrice = '';
		maxPrice = '';
		roomType = '';
	}
</script>

<svelte:head>
	<title>Boliger – LejeMatch</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-6">
	<div class="mb-6">
		<h1 class="text-xl font-bold text-foreground uppercase tracking-wide">Boliger</h1>
		<p class="text-sm text-muted-foreground mb-4">Find din næste bolig blandt ledige lejligheder og værelser.</p>

		<div class="flex items-center gap-2 mb-4">
			<button
				onclick={() => (showFilters = !showFilters)}
				class="flex items-center gap-1.5 px-3 py-2 text-xs font-medium uppercase tracking-wide border border-border transition-colors {filtersVisible ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground hover:bg-muted'}"
			>
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm3 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
				</svg>
				Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
			</button>
		</div>

		{#if filtersVisible}
			<div class="flex flex-wrap gap-3 p-4 bg-muted mb-4">
				<div>
					<label class="text-xs text-muted-foreground mb-1 block">By</label>
					<input
						type="text"
						placeholder="F.eks. København"
						bind:value={city}
						class="w-44 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label class="text-xs text-muted-foreground mb-1 block">Min pris (kr/md)</label>
					<input
						type="number"
						placeholder="F.eks. 3000"
						bind:value={minPrice}
						class="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label class="text-xs text-muted-foreground mb-1 block">Max pris (kr/md)</label>
					<input
						type="number"
						placeholder="F.eks. 10000"
						bind:value={maxPrice}
						class="w-32 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label class="text-xs text-muted-foreground mb-1 block">Boligtype</label>
					<select
						bind:value={roomType}
						class="w-44 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">Alle</option>
						<option value="private">Privat værelse</option>
						<option value="shared">Delt værelse</option>
						<option value="apartment">Lejlighed</option>
					</select>
				</div>
				<div class="flex items-end gap-2">
					<a
						href={buildUrl()}
						class="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
					>
						Søg
					</a>
					<button
						onclick={resetFilters}
						class="px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
					>
						Nulstil
					</button>
				</div>
			</div>
		{/if}
	</div>

	{#if data.listings.length === 0}
		<div class="text-center py-16">
			<svg class="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			<p class="text-muted-foreground">Ingen boliger fundet</p>
			<p class="text-sm text-muted-foreground mt-1">Prøv at ændre dine søgekriterier</p>
		</div>
	{:else}
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
			{#each data.listings as listing (listing.ID)}
				<a
					href="/listings/{listing.ID}"
					class="group bg-background hover:bg-muted transition-colors block"
				>
					<div class="aspect-[4/3] bg-muted relative overflow-hidden">
						{#if listing.Images?.length}
							<img
								src={listing.Images[0]}
								alt={listing.Title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center bg-accent/30">
								<svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
								</svg>
							</div>
						{/if}
						<div class="absolute top-0 right-0 bg-foreground text-background text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
							{listing.Price.toLocaleString('da-DK')} kr
						</div>
					</div>
					<div class="p-4">
						<h3 class="font-bold text-foreground text-sm uppercase tracking-wide truncate">{listing.Title}</h3>
						<div class="flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							{listing.City}{listing.Area ? `, ${listing.Area}` : ''}
						</div>
						<div class="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
							<span class="border border-border px-2 py-0.5">{roomTypeLabel[listing.RoomType] ?? listing.RoomType}</span>
						</div>
					</div>
				</a>
			{/each}
		</div>

		{#if data.totalPages > 1}
			<div class="flex items-center justify-center gap-2 mt-8">
				{#if data.page > 1}
					<a
						href="/listings?page={data.page - 1}"
						class="px-4 py-2 border border-border text-xs font-medium uppercase tracking-wide hover:bg-muted transition-colors"
					>
						← Forrige
					</a>
				{/if}
				<span class="text-xs text-muted-foreground">Side {data.page} af {data.totalPages}</span>
				{#if data.page < data.totalPages}
					<a
						href="/listings?page={data.page + 1}"
						class="px-4 py-2 border border-border text-xs font-medium uppercase tracking-wide hover:bg-muted transition-colors"
					>
						Næste →
					</a>
				{/if}
			</div>
		{/if}
	{/if}
</div>
