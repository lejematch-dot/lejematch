<script lang="ts">
	import { goto } from '$app/navigation';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let city = $state<string>(data.filters.city ?? '');
	let maxBudget = $state<string>(data.filters.maxBudget?.toString() ?? '');
	let roomType = $state<string[]>(data.filters.roomType ?? []);
	let furnishedPreference = $state<string[]>(data.filters.furnishedPreference ?? []);
	let rentalPeriod = $state<string[]>(data.filters.rentalPeriod ?? []);
	let showFilters = $state(
		Boolean(
			city || maxBudget || roomType.length || furnishedPreference.length || rentalPeriod.length
		)
	);

	const roomTypeLabel: Record<string, string> = {
		private: 'Privat værelse',
		shared: 'Delt værelse',
		apartment: 'Lejlighed'
	};

	const rentalPeriodLabel: Record<string, string> = {
		unlimited: 'Ubegrænset',
		limited: 'Tidsbegrænset'
	};

	function formatShortDate(iso: string): string {
		return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	const activeFilterCount = $derived(
		[city, maxBudget].filter(Boolean).length +
			[roomType, furnishedPreference, rentalPeriod].filter((arr) => arr.length > 0).length
	);

	function buildUrl(category = data.category) {
		const params = new URLSearchParams();
		if (city) params.set('city', city);
		if (maxBudget) params.set('maxBudget', maxBudget);
		if (category === 'vaerelse' && roomType.length) params.set('roomType', roomType.join(','));
		if (furnishedPreference.length) params.set('furnishedPreference', furnishedPreference.join(','));
		if (rentalPeriod.length) params.set('rentalPeriod', rentalPeriod.join(','));
		if (category !== 'hele') params.set('category', category);
		const qs = params.toString();
		return `/lejere${qs ? `?${qs}` : ''}`;
	}

	function applyFilters() {
		goto(buildUrl(), { keepFocus: true, noScroll: true });
	}

	function toggle(list: string[], value: string): string[] {
		return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
	}

	function toggleRoomType(value: string) {
		roomType = toggle(roomType, value);
		applyFilters();
	}

	function toggleFurnishedPreference(value: string) {
		furnishedPreference = toggle(furnishedPreference, value);
		applyFilters();
	}

	function toggleRentalPeriod(value: string) {
		rentalPeriod = toggle(rentalPeriod, value);
		applyFilters();
	}

	function resetFilters() {
		city = '';
		maxBudget = '';
		roomType = [];
		furnishedPreference = [];
		rentalPeriod = [];
		applyFilters();
	}
</script>

<svelte:head>
	<title>Lejere – LejeMatch</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-6">
	<div class="mb-6">
		<h1 class="text-xl font-bold text-foreground uppercase tracking-wide">Lejere</h1>
		<p class="text-sm text-muted-foreground">Se opslag fra folk der søger et sted at bo.</p>
	</div>

	<div class="grid grid-cols-2 gap-px bg-border border border-border mb-4">
		<a
			href={buildUrl('hele')}
			class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors text-center {data.category === 'hele' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
		>
			Søger hel bolig
		</a>
		<a
			href={buildUrl('vaerelse')}
			class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors text-center {data.category === 'vaerelse' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
		>
			Søger værelse i bofællesskab
		</a>
	</div>

	<div class="sticky top-16 z-30 mb-6 inline-block">
		<button
			onclick={() => (showFilters = !showFilters)}
			class="flex items-center gap-1.5 px-3 py-2 text-xs font-medium uppercase tracking-wide border border-border transition-colors shadow-sm {showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground hover:bg-muted'}"
		>
			<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm3 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
			</svg>
			Filtre{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
		</button>

		{#if showFilters}
			<div class="absolute left-0 top-full mt-2 w-[90vw] max-w-xl flex flex-wrap gap-3 p-3 bg-muted border border-border shadow-lg">
				<div>
					<label class="text-[11px] text-muted-foreground mb-1 block">By</label>
					<select
						bind:value={city}
						onchange={applyFilters}
						class="w-36 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">Alle byer</option>
						{#each data.cityGroups as group (group.region)}
							<optgroup label={group.region}>
								{#each group.cities as c (c)}
									<option value={c}>{c}</option>
								{/each}
							</optgroup>
						{/each}
					</select>
				</div>
				<div>
					<label class="text-[11px] text-muted-foreground mb-1 block">Max budget (kr/md)</label>
					<input
						type="number"
						placeholder="6000"
						bind:value={maxBudget}
						onchange={applyFilters}
						class="w-24 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				{#if data.category === 'vaerelse'}
					<div>
						<label class="text-[11px] text-muted-foreground mb-1 block">Værelsestype</label>
						<div class="flex flex-wrap gap-1">
							<button
								type="button"
								onclick={() => toggleRoomType('private')}
								class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {roomType.includes('private') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
							>
								Privat værelse
							</button>
							<button
								type="button"
								onclick={() => toggleRoomType('shared')}
								class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {roomType.includes('shared') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
							>
								Delt værelse
							</button>
						</div>
					</div>
				{/if}
				<div>
					<label class="text-[11px] text-muted-foreground mb-1 block">Møblering</label>
					<div class="flex flex-wrap gap-1">
						<button
							type="button"
							onclick={() => toggleFurnishedPreference('furnished')}
							class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {furnishedPreference.includes('furnished') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
						>
							Møbleret
						</button>
						<button
							type="button"
							onclick={() => toggleFurnishedPreference('unfurnished')}
							class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {furnishedPreference.includes('unfurnished') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
						>
							Umøbleret
						</button>
					</div>
				</div>
				<div>
					<label class="text-[11px] text-muted-foreground mb-1 block">Lejeperiode</label>
					<div class="flex flex-wrap gap-1">
						<button
							type="button"
							onclick={() => toggleRentalPeriod('unlimited')}
							class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {rentalPeriod.includes('unlimited') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
						>
							Ubegrænset
						</button>
						<button
							type="button"
							onclick={() => toggleRentalPeriod('limited')}
							class="px-2 py-1 text-[11px] font-medium border rounded transition-colors {rentalPeriod.includes('limited') ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-muted'}"
						>
							Tidsbegrænset
						</button>
					</div>
				</div>
				<div class="flex items-end">
					<button
						type="button"
						onclick={resetFilters}
						class="px-2 py-1 text-[11px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
					>
						Nulstil
					</button>
				</div>
			</div>
		{/if}
	</div>

	{#if data.seekers.length === 0}
		<div class="text-center py-16">
			<svg class="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<p class="text-muted-foreground">Ingen lejere fundet</p>
			<p class="text-sm text-muted-foreground mt-1">Prøv at ændre dine søgekriterier</p>
		</div>
	{:else}
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
			{#each data.seekers as seeker (seeker.ID)}
				<a href="/lejere/{seeker.ID}" class="group bg-background hover:bg-muted transition-colors block">
					<div class="aspect-[4/3] bg-muted relative overflow-hidden">
						{#if seeker.Images?.length}
							<img
								src={seeker.Images[0]}
								alt={seeker.Title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center bg-accent/30">
								<svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
						{/if}
						<div class="absolute top-0 right-0 bg-foreground text-background text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
							Max {seeker.MaxBudget.toLocaleString('da-DK')} kr
						</div>
						{#if data.user}
							<div class="absolute top-2 left-2">
								<FavoriteButton
									favoriteType="seeker"
									favoriteId={seeker.ID}
									initialFavorited={data.favoriteIds.includes(seeker.ID)}
								/>
							</div>
						{/if}
					</div>
					<div class="p-4">
						<h3 class="font-bold text-foreground text-sm uppercase tracking-wide truncate">{seeker.Title}</h3>
						<div class="flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							{seeker.City}
						</div>
						<div class="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
							<span class="border border-border px-2 py-0.5">{roomTypeLabel[seeker.RoomType] ?? seeker.RoomType}</span>
						</div>
						<div class="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
							{#if seeker.RentalPeriod}
								<span>{rentalPeriodLabel[seeker.RentalPeriod] ?? seeker.RentalPeriod}</span>
								<span>·</span>
							{/if}
							<span>Indflytning fra {formatShortDate(seeker.MoveInFrom)}</span>
						</div>
						{#if seeker.Description}
							<p class="text-xs text-muted-foreground mt-2 line-clamp-2">{seeker.Description}</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		{#if data.totalPages > 1}
			<div class="flex items-center justify-center gap-2 mt-8">
				{#if data.page > 1}
					<a
						href="{buildUrl()}{buildUrl().includes('?') ? '&' : '?'}page={data.page - 1}"
						class="px-4 py-2 border border-border text-xs font-medium uppercase tracking-wide hover:bg-muted transition-colors"
					>
						← Forrige
					</a>
				{/if}
				<span class="text-xs text-muted-foreground">Side {data.page} af {data.totalPages}</span>
				{#if data.page < data.totalPages}
					<a
						href="{buildUrl()}{buildUrl().includes('?') ? '&' : '?'}page={data.page + 1}"
						class="px-4 py-2 border border-border text-xs font-medium uppercase tracking-wide hover:bg-muted transition-colors"
					>
						Næste →
					</a>
				{/if}
			</div>
		{/if}
	{/if}
</div>
