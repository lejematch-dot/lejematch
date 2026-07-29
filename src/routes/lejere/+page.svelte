<script lang="ts">
	import { goto } from '$app/navigation';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import { getObjectPosition } from '$lib/imagePosition';
	import { clickOutside } from '$lib/actions/clickOutside';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let city = $state<string>(data.filters.city ?? '');
	let maxBudget = $state<string>(data.filters.maxBudget?.toString() ?? '');
	let furnishedPreference = $state<string[]>(data.filters.furnishedPreference ?? []);
	let rentalPeriod = $state<string[]>(data.filters.rentalPeriod ?? []);
	let showFilters = $state(
		Boolean(city || maxBudget || furnishedPreference.length || rentalPeriod.length)
	);
	let mobileCols = $state<1 | 2>(2);
	const mobileGridClass: Record<1 | 2, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2'
	};

	const seekingTypeLabel: Record<string, string> = {
		bolig: 'Hel bolig',
		roommate: 'Værelse i bofællesskab',
		begge: 'Hel bolig eller værelse'
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
			[furnishedPreference, rentalPeriod].filter((arr) => arr.length > 0).length
	);

	function buildUrl(category = data.category) {
		const params = new URLSearchParams();
		if (city) params.set('city', city);
		if (maxBudget) params.set('maxBudget', maxBudget);
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
		furnishedPreference = [];
		rentalPeriod = [];
		applyFilters();
	}
</script>

<div class="max-w-7xl mx-auto px-4 py-6">
	<div class="mb-6">
		<h1 class="text-xl font-bold text-foreground uppercase tracking-wide">Lejere</h1>
		<p class="text-sm text-muted-foreground">Se opslag fra folk der søger et sted at bo.</p>
	</div>

	<div class="grid grid-cols-2 gap-px bg-border border border-border mb-4">
		<a
			href={buildUrl('hele')}
			onclick={(e) => {
				e.preventDefault();
				goto(buildUrl('hele'), { replaceState: true, noScroll: true });
			}}
			class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors text-center {data.category === 'hele' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
		>
			Søger hel bolig
		</a>
		<a
			href={buildUrl('vaerelse')}
			onclick={(e) => {
				e.preventDefault();
				goto(buildUrl('vaerelse'), { replaceState: true, noScroll: true });
			}}
			class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors text-center {data.category === 'vaerelse' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
		>
			Søger værelse i bofællesskab
		</a>
	</div>

	<div class="sticky top-16 z-30 mb-6 inline-block" use:clickOutside={() => (showFilters = false)}>
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
		<div class="flex items-center justify-end gap-1 mb-3 sm:hidden">
			<span class="text-[10px] uppercase tracking-wide text-muted-foreground mr-1">Vis:</span>
			<button
				type="button"
				onclick={() => (mobileCols = 1)}
				aria-label="1 opslag pr. række"
				class="p-1.5 border transition-colors {mobileCols === 1 ? 'border-foreground bg-muted' : 'border-border text-muted-foreground'}"
			>
				<svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="4" width="12" height="8" /></svg>
			</button>
			<button
				type="button"
				onclick={() => (mobileCols = 2)}
				aria-label="2 opslag pr. række"
				class="p-1.5 border transition-colors {mobileCols === 2 ? 'border-foreground bg-muted' : 'border-border text-muted-foreground'}"
			>
				<svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
					<rect x="1.5" y="4" width="5.5" height="8" /><rect x="9" y="4" width="5.5" height="8" />
				</svg>
			</button>
		</div>

		<div class="grid {mobileGridClass[mobileCols]} sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.seekers as seeker (seeker.ID)}
				<a href="/lejere/{seeker.ID}" class="group bg-background border border-border hover:bg-muted transition-colors block">
					<div class="aspect-[4/3] bg-muted relative overflow-hidden">
						{#if seeker.Images?.length}
							<img
								src={seeker.Images[0]}
								alt={seeker.Title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								style="object-position: {getObjectPosition(seeker.Images[0])}"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center bg-accent/30">
								<svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
						{/if}
						<div class="absolute top-0 right-0 bg-foreground text-background {mobileCols === 2 ? 'text-[8px] px-1.5 py-1' : 'text-xs px-3 py-1.5'} sm:text-xs sm:px-3 sm:py-1.5 font-bold uppercase tracking-wide">
							Max {seeker.MaxBudget.toLocaleString('da-DK')} kr
						</div>
						{#if data.user}
							<div class="absolute top-2 left-2 {mobileCols === 2 ? 'hidden' : ''} sm:block">
								<FavoriteButton
									favoriteType="seeker"
									favoriteId={seeker.ID}
									initialFavorited={data.favoriteIds.includes(seeker.ID)}
								/>
							</div>
						{/if}
					</div>
					<div class="{mobileCols === 2 ? 'p-2' : 'p-4'} sm:p-4">
						<h3 class="font-bold text-foreground {mobileCols === 2 ? 'text-xs' : 'text-sm'} sm:text-sm uppercase tracking-wide">{seeker.Title}</h3>
						<div class="{mobileCols === 2 ? 'hidden' : 'flex'} sm:flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							{seeker.CityDisplay || seeker.City}
						</div>
						<div class="{mobileCols !== 1 ? 'hidden' : 'flex'} sm:flex items-center gap-3 mt-2 text-xs text-muted-foreground">
							<span class="border border-border px-2 py-0.5">
								{seekingTypeLabel[seeker.SeekingType ?? ''] ?? 'Hel bolig'}{#if (seeker.SeekingType === 'roommate' || seeker.SeekingType === 'begge') && seeker.NumRooms && seeker.NumRooms > 1}
									({seeker.NumRooms} værelser)
								{/if}
							</span>
						</div>
						<div class="{mobileCols !== 1 ? 'hidden' : 'flex'} sm:flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
							{#if seeker.RentalPeriod}
								<span>{rentalPeriodLabel[seeker.RentalPeriod] ?? seeker.RentalPeriod}</span>
								<span>·</span>
							{/if}
							<span>Indflytning fra {formatShortDate(seeker.MoveInFrom)}</span>
						</div>
						{#if seeker.Description}
							<p class="{mobileCols !== 1 ? 'hidden' : 'line-clamp-3'} sm:line-clamp-3 text-xs text-muted-foreground mt-2">{seeker.Description}</p>
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
