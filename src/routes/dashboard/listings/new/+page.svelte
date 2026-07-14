<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

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

	let boligKategori = $state<'room' | 'hele'>('room');
	let rentalPeriod = $state('');
</script>

<svelte:head>
	<title>Nyt opslag – LejeMatch</title>
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
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Nyt opslag</h1>
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
					maxlength="70"
					placeholder="F.eks. Lyst værelse på Nørrebro"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="Price" class="block text-sm font-medium text-foreground mb-1">Pris/måned (kr) *</label>
					<input
						id="Price"
						name="Price"
						type="number"
						required
						min="1"
						placeholder="5000"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="AvailableFrom" class="block text-sm font-medium text-foreground mb-1">Ledig fra *</label>
					<input
						id="AvailableFrom"
						name="AvailableFrom"
						type="date"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
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
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						{#each APARTMENT_KINDS as kind (kind.value)}
							<option value={kind.value}>{kind.label}</option>
						{/each}
					</select>
					<input type="hidden" name="RoomType" value="apartment" />
				{/if}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="SizeSqm" class="block text-sm font-medium text-foreground mb-1">Størrelse (m²)</label>
					<input
						id="SizeSqm"
						name="SizeSqm"
						type="number"
						placeholder="45"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="Deposit" class="block text-sm font-medium text-foreground mb-1">Depositum (kr)</label>
					<input
						id="Deposit"
						name="Deposit"
						type="number"
						placeholder="15000"
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
						placeholder="F.eks. 6 måneder, til 31. december 2026"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			{/if}

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="LandlordType" class="block text-sm font-medium text-foreground mb-1">Udlejer</label>
					<select
						id="LandlordType"
						name="LandlordType"
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
					placeholder="F.eks. Studerende, par, rolig person"
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
					placeholder="København"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="Zip" class="block text-sm font-medium text-foreground mb-1">Postnummer</label>
					<input
						id="Zip"
						name="Zip"
						type="text"
						placeholder="2200"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="Area" class="block text-sm font-medium text-foreground mb-1">Område</label>
					<input
						id="Area"
						name="Area"
						type="text"
						placeholder="Nørrebro"
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
						<input type="checkbox" name="Facilities" value={facility} class="accent-primary" />
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
					placeholder="Beskriv boligen — beliggenhed, stand, faciliteter, hvem du søger..."
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				></textarea>
			</div>
		</section>

		<!-- Images -->
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Billeder</h2>
			<ImageUploader name="Images" min={5} />
		</section>

		<div class="flex gap-3 pt-2">
			<button
				type="submit"
				class="flex-1 h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
			>
				Publicér opslag
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
