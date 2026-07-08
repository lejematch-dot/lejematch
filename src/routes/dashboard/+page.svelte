<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Mine Opslag – LejeMatch</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Velkommen tilbage</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">{data.firstName || data.user?.email}</h1>
	</div>

	<section class="mb-10">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Dine boligopslag</h2>

		{#if data.listings.length === 0}
			<div class="border border-border p-12 text-center">
				<svg class="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				<p class="text-sm text-muted-foreground">Du har ingen aktive boligopslag endnu.</p>
				<a
					href="/dashboard/opret"
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
							<a
								href="/dashboard/listings/{listing.ID}/edit"
								class="border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors"
							>
								Rediger
							</a>
							<form
								method="POST"
								action="?/deleteListing"
								use:enhance={() => {
									if (!confirm('Er du sikker på, at du vil slette dette opslag?')) return async () => {};
								}}
							>
								<input type="hidden" name="id" value={listing.ID} />
								<button
									type="submit"
									class="border border-destructive/30 text-destructive px-3 py-1.5 text-xs font-medium uppercase tracking-wide hover:bg-destructive/5 transition-colors"
								>
									Slet
								</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<section>
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Dine lejer-opslag</h2>

		{#if data.seekers.length === 0}
			<div class="border border-border p-12 text-center">
				<svg class="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<p class="text-sm text-muted-foreground">Du har ingen aktive lejer-opslag endnu.</p>
				<a
					href="/lejere/ny"
					class="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
				>
					Opret dit første opslag
				</a>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.seekers as seeker (seeker.ID)}
					<div class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors">
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{seeker.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">{seeker.City} · Max {seeker.MaxBudget.toLocaleString('da-DK')} kr/md.</p>
						</div>
						<div class="flex gap-2">
							<a
								href="/lejere/{seeker.ID}"
								class="border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors"
							>
								Se
							</a>
							<a
								href="/dashboard/seekers/{seeker.ID}/edit"
								class="border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground hover:bg-muted transition-colors"
							>
								Rediger
							</a>
							<form
								method="POST"
								action="?/deleteSeeker"
								use:enhance={() => {
									if (!confirm('Er du sikker på, at du vil slette dette opslag?')) return async () => {};
								}}
							>
								<input type="hidden" name="id" value={seeker.ID} />
								<button
									type="submit"
									class="border border-destructive/30 text-destructive px-3 py-1.5 text-xs font-medium uppercase tracking-wide hover:bg-destructive/5 transition-colors"
								>
									Slet
								</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
