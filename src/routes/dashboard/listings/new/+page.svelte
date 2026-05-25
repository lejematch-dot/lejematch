<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
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
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Dashboard</p>
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
					placeholder="F.eks. Lyst værelse på Nørrebro"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
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
					<label for="RoomType" class="block text-sm font-medium text-foreground mb-1">Type *</label>
					<select
						id="RoomType"
						name="RoomType"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					>
						<option value="private">Privat værelse</option>
						<option value="shared">Delt værelse</option>
						<option value="apartment">Lejlighed</option>
					</select>
				</div>
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

			<div class="grid grid-cols-2 gap-4">
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
			<p class="text-xs text-muted-foreground">Én billed-URL per linje.</p>

			<div>
				<label for="Images" class="block text-sm font-medium text-foreground mb-1">Billed-URLs</label>
				<textarea
					id="Images"
					name="Images"
					rows="4"
					placeholder="https://example.com/billede1.jpg&#10;https://example.com/billede2.jpg"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
				></textarea>
			</div>
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
