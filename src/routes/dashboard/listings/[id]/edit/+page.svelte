<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const FACILITIES = [
		'Altan',
		'Opvaskemaskine',
		'Vaskemaskine',
		'Tørretumbler',
		'Parkering',
		'Kælder',
		'Have',
		'Husdyr tilladt',
		'Møbleret',
		'Internet inkl.',
		'El inkl.',
		'Vand inkl.'
	];

	const APARTMENT_KINDS = [
		{ value: '1v', label: '1-værelses' },
		{ value: '2v', label: '2-værelses' },
		{ value: '3v', label: '3-værelses' },
		{ value: '4v', label: '4-værelses' },
		{ value: '5v', label: '5-værelses+' },
		{ value: 'house', label: 'Hus' }
	];

	function initialBoligKategori(): 'room' | 'hele' {
		if (data.listing.ListingKind) return data.listing.ListingKind === 'room' ? 'room' : 'hele';
		return data.listing.RoomType === 'apartment' ? 'hele' : 'room';
	}

	let boligKategori = $state<'room' | 'hele'>(initialBoligKategori());
	let rentalPeriod = $state(data.listing.RentalPeriod ?? '');
</script>

<svelte:head>
	<title>Rediger opslag – LejeMatch</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	<a
		href="/dashboard"
		class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Tilbage
	</a>

	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Mine Opslag</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Rediger opslag</h1>
	</div>

	{#if form?.error}
		<p class="mb-6 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
	{/if}

	<form method="POST" use:enhance class="space-y-6">
		<!-- Basic info -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Grundoplysninger</h2>

			<div>
				<label for="Title" class="block text-sm font-medium text-foreground mb-1">Titel *</label>
				<input
					id="Title"
					name="Title"
					type="text"
					required
					value={data.listing.Title}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div>
				<label for="Price" class="block text-sm font-medium text-foreground mb-1">Pris/måned (kr) *</label>
				<input
					id="Price"
					name="Price"
					type="number"
					required
					min="1"
					value={data.listing.Price}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-foreground mb-1">Hvad udlejer du? *</label>
				<div class="grid grid-cols-2 gap-px bg-border border border-border mb-3">
					<button
						type="button"
						onclick={() => (boligKategori = 'room')}
						class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors {boligKategori === 'room' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
					>
						Værelse
					</button>
					<button
						type="button"
						onclick={() => (boligKategori = 'hele')}
						class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors {boligKategori === 'hele' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
					>
						Hel bolig / hus
					</button>
				</div>

				{#if boligKategori === 'room'}
					<select
						name="RoomType"
						required
						value={data.listing.RoomType === 'shared' ? 'shared' : 'private'}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="private">Privat værelse</option>
						<option value="shared">Delt værelse</option>
					</select>
					<input type="hidden" name="ListingKind" value="room" />

					<div class="mt-3">
						<label for="RoommatesWanted" class="block text-sm font-medium text-foreground mb-1">Antal nye roomies I søger</label>
						<select
							id="RoommatesWanted"
							name="RoommatesWanted"
							value={data.listing.RoommatesWanted ?? 1}
							class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						>
							<option value="1">1 roomie</option>
							<option value="2">2 roomies</option>
							<option value="3">3 roomies</option>
							<option value="4">4+ roomies</option>
						</select>
					</div>
				{:else}
					<select
						name="ListingKind"
						required
						value={APARTMENT_KINDS.some((k) => k.value === data.listing.ListingKind) ? data.listing.ListingKind : '1v'}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						{#each APARTMENT_KINDS as kind (kind.value)}
							<option value={kind.value}>{kind.label}</option>
						{/each}
					</select>
					<input type="hidden" name="RoomType" value="apartment" />
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="AvailableFrom" class="block text-sm font-medium text-foreground mb-1">Ledig fra *</label>
					<input
						id="AvailableFrom"
						name="AvailableFrom"
						type="date"
						required
						value={data.listing.AvailableFrom}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="Status" class="block text-sm font-medium text-foreground mb-1">Status</label>
					<select
						id="Status"
						name="Status"
						value={data.listing.Status}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="active">Aktiv</option>
						<option value="rented">Udlejet</option>
						<option value="archived">Arkiveret</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="SizeSqm" class="block text-sm font-medium text-foreground mb-1">Størrelse (m²)</label>
					<input
						id="SizeSqm"
						name="SizeSqm"
						type="number"
						value={data.listing.SizeSqm ?? ''}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="Deposit" class="block text-sm font-medium text-foreground mb-1">Depositum (kr)</label>
					<input
						id="Deposit"
						name="Deposit"
						type="number"
						value={data.listing.Deposit ?? ''}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			<div>
				<label for="RentalPeriod" class="block text-sm font-medium text-foreground mb-1">Lejeperiode</label>
				<select
					id="RentalPeriod"
					name="RentalPeriod"
					bind:value={rentalPeriod}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<option value="">Vælg...</option>
					<option value="unlimited">Ubegrænset</option>
					<option value="limited">Tidsbegrænset</option>
				</select>
			</div>

			{#if rentalPeriod === 'limited'}
				<div>
					<label for="RentalPeriodDetails" class="block text-sm font-medium text-foreground mb-1">Angiv periode</label>
					<input
						id="RentalPeriodDetails"
						name="RentalPeriodDetails"
						type="text"
						value={data.listing.RentalPeriodDetails ?? ''}
						placeholder="F.eks. 6 måneder, til 31. december 2026"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			{/if}

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="LandlordType" class="block text-sm font-medium text-foreground mb-1">Udlejer</label>
					<select
						id="LandlordType"
						name="LandlordType"
						value={data.listing.LandlordType ?? ''}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">Vælg...</option>
						<option value="boligselskab">Boligselskab</option>
						<option value="privat">Privat udlejer</option>
					</select>
				</div>
				<div>
					<label for="FurnishedPreference" class="block text-sm font-medium text-foreground mb-1">Møblering</label>
					<select
						id="FurnishedPreference"
						name="FurnishedPreference"
						value={data.listing.FurnishedPreference ?? ''}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">Vælg...</option>
						<option value="furnished">Møbleret</option>
						<option value="unfurnished">Umøbleret</option>
						<option value="any">Ligegyldigt</option>
					</select>
				</div>
			</div>

			<div>
				<label for="TargetAudience" class="block text-sm font-medium text-foreground mb-1">Hvem søger du?</label>
				<input
					id="TargetAudience"
					name="TargetAudience"
					type="text"
					value={data.listing.TargetAudience ?? ''}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
		</section>

		<!-- Location -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Placering</h2>

			<div>
				<label for="City" class="block text-sm font-medium text-foreground mb-1">By *</label>
				<input
					id="City"
					name="City"
					type="text"
					required
					value={data.listing.City}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="Zip" class="block text-sm font-medium text-foreground mb-1">Postnummer</label>
					<input
						id="Zip"
						name="Zip"
						type="text"
						value={data.listing.Zip}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="Area" class="block text-sm font-medium text-foreground mb-1">Område</label>
					<input
						id="Area"
						name="Area"
						type="text"
						value={data.listing.Area}
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>
		</section>

		<!-- Facilities -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Faciliteter</h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
				{#each FACILITIES as facility (facility)}
					<label class="flex items-center gap-2 text-sm cursor-pointer">
						<input
							type="checkbox"
							name="Facilities"
							value={facility}
							checked={data.listing.Facilities?.includes(facility)}
							class="accent-primary"
						/>
						{facility}
					</label>
				{/each}
			</div>
		</section>

		<!-- Description -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Beskrivelse</h2>

			<div>
				<label for="Description" class="block text-sm font-medium text-foreground mb-1">Beskrivelse *</label>
				<textarea
					id="Description"
					name="Description"
					required
					rows="6"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				>{data.listing.Description}</textarea>
			</div>
		</section>

		<!-- Images -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Billeder</h2>
			<ImageUploader name="Images" initialUrls={data.listing.Images ?? []} min={5} />
		</section>

		<div class="flex gap-3 pt-2">
			<button
				type="submit"
				class="flex-1 h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
			>
				Gem ændringer
			</button>
			<a
				href="/dashboard"
				class="px-6 h-11 flex items-center border border-border text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors rounded-md"
			>
				Annuller
			</a>
		</div>
	</form>
</div>
