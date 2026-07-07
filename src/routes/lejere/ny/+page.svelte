<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let boligKategori = $state<'room' | 'hele'>('hele');
</script>

<svelte:head>
	<title>Nyt lejeropslag – LejeMatch</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	<a
		href="/lejere"
		class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Tilbage
	</a>

	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Lejere</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Nyt opslag</h1>
	</div>

	{#if form?.error}
		<p class="mb-6 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
	{/if}

	<form method="POST" use:enhance class="space-y-6">
		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Grundoplysninger</h2>

			<div>
				<label for="Title" class="block text-sm font-medium text-foreground mb-1">Titel *</label>
				<input
					id="Title"
					name="Title"
					type="text"
					required
					placeholder="F.eks. Studerende søger værelse i København"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="MaxBudget" class="block text-sm font-medium text-foreground mb-1">Max budget/måned (kr) *</label>
					<input
						id="MaxBudget"
						name="MaxBudget"
						type="number"
						required
						min="1"
						placeholder="6000"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="MoveInFrom" class="block text-sm font-medium text-foreground mb-1">Indflytning fra *</label>
					<input
						id="MoveInFrom"
						name="MoveInFrom"
						type="date"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium text-foreground mb-1">Hvad søger du? *</label>
				<div class="grid grid-cols-2 gap-px bg-border border border-border mb-3">
					<button
						type="button"
						onclick={() => (boligKategori = 'hele')}
						class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors {boligKategori === 'hele' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
					>
						Hel bolig
					</button>
					<button
						type="button"
						onclick={() => (boligKategori = 'room')}
						class="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors {boligKategori === 'room' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted'}"
					>
						Værelse i bofællesskab
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
					<input type="hidden" name="SeekingType" value="roommate" />
				{:else}
					<input type="hidden" name="RoomType" value="apartment" />
					<input type="hidden" name="SeekingType" value="bolig" />
				{/if}
			</div>
		</section>

		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Detaljer</h2>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="NumPeople" class="block text-sm font-medium text-foreground mb-1">Antal personer</label>
					<select
						id="NumPeople"
						name="NumPeople"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="1">1 person</option>
						<option value="2">2 personer</option>
						<option value="3">3 personer</option>
						<option value="4">4+ personer</option>
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
				<div>
					<label for="RentalPeriod" class="block text-sm font-medium text-foreground mb-1">Ønsket lejeperiode</label>
					<select
						id="RentalPeriod"
						name="RentalPeriod"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="">Vælg...</option>
						<option value="unlimited">Ubegrænset</option>
						<option value="limited">Tidsbegrænset</option>
					</select>
				</div>
			</div>

			<div>
				<label for="FacebookURL" class="block text-sm font-medium text-foreground mb-1">Facebook link</label>
				<input
					id="FacebookURL"
					name="FacebookURL"
					type="text"
					placeholder="https://facebook.com/..."
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
		</section>

		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Placering</h2>

			<div>
				<label for="City" class="block text-sm font-medium text-foreground mb-1">Ønsket by *</label>
				<input
					id="City"
					name="City"
					type="text"
					required
					placeholder="København"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
		</section>

		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Beskrivelse</h2>

			<div>
				<label for="Description" class="block text-sm font-medium text-foreground mb-1">Beskrivelse *</label>
				<textarea
					id="Description"
					name="Description"
					required
					rows="6"
					placeholder="Fortæl om dig/jer og hvad I søger..."
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				></textarea>
			</div>
		</section>

		<section class="border border-border p-6 space-y-4">
			<h2 class="text-sm font-bold text-foreground uppercase tracking-wide">Billeder</h2>
			<ImageUploader name="Images" />
		</section>

		<div class="flex gap-3 pt-2">
			<button
				type="submit"
				class="flex-1 h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
			>
				Publicér opslag
			</button>
			<a
				href="/lejere"
				class="px-6 h-11 flex items-center border border-border text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors rounded-md"
			>
				Annuller
			</a>
		</div>
	</form>
</div>
