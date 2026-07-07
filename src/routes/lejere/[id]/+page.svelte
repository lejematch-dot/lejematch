<script lang="ts">
	import { enhance } from '$app/forms';
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import ReportButton from '$lib/components/ReportButton.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const isOwner = $derived(data.user?.sub === data.seeker.UserID);

	const seekingTypeLabel: Record<string, string> = {
		bolig: 'Hel bolig',
		roommate: 'Værelse i bofællesskab',
		begge: 'Hel bolig eller værelse'
	};

	const rentalPeriodLabel: Record<string, string> = {
		unlimited: 'Ubegrænset lejeperiode',
		limited: 'Tidsbegrænset lejeperiode'
	};

	const moveInFrom = $derived(
		new Date(data.seeker.MoveInFrom).toLocaleDateString('da-DK', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	let lightboxIdx = $state<number | null>(null);

	function prevImage() {
		if (lightboxIdx === null) return;
		lightboxIdx = (lightboxIdx - 1 + data.seeker.Images.length) % data.seeker.Images.length;
	}

	function nextImage() {
		if (lightboxIdx === null) return;
		lightboxIdx = (lightboxIdx + 1) % data.seeker.Images.length;
	}
</script>

<svelte:head>
	<title>{data.seeker.Title} – LejeMatch</title>
</svelte:head>

<svelte:window
	onkeydown={(e) => {
		if (lightboxIdx === null) return;
		if (e.key === 'Escape') lightboxIdx = null;
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'ArrowRight') nextImage();
	}}
/>

<div class="max-w-5xl mx-auto px-4 py-6">
	<a
		href="/lejere"
		class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-4 transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Tilbage
	</a>

	<div class="flex items-start justify-between gap-4 mb-4">
		<h1 class="text-2xl font-bold text-foreground uppercase tracking-wide">{data.seeker.Title}</h1>
		{#if data.user}
			<div class="shrink-0">
				<FavoriteButton favoriteType="seeker" favoriteId={data.seeker.ID} initialFavorited={data.isFavorite} variant="plain" />
			</div>
		{/if}
	</div>

	{#if data.seeker.Images?.length}
		<div class="flex flex-col items-center mb-8">
			<button
				type="button"
				onclick={() => (lightboxIdx = 0)}
				class="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-2xl bg-muted cursor-pointer"
			>
				<img
					src={data.seeker.Images[0]}
					alt={data.seeker.Title}
					class="w-full h-full object-cover hover:opacity-90 transition-opacity"
				/>
			</button>
			{#if data.seeker.Images.length > 1}
				<button
					type="button"
					onclick={() => (lightboxIdx = 0)}
					class="mt-3 text-xs font-medium uppercase tracking-widest text-foreground border border-border px-4 py-2 hover:bg-muted transition-colors"
				>
					Vis alle billeder ({data.seeker.Images.length})
				</button>
			{/if}
		</div>
	{:else}
		<div class="h-[300px] bg-muted flex items-center justify-center mb-8">
			<svg class="w-16 h-16 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
		</div>
	{/if}

	<div class="grid lg:grid-cols-3 gap-8">
		<div class="lg:col-span-2 space-y-6">
			<div class="flex items-center gap-2 text-muted-foreground">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span>{data.seeker.City}</span>
			</div>

			<div class="flex flex-wrap gap-3">
				<span class="bg-primary text-primary-foreground font-semibold px-4 py-2 text-sm">
					Max {data.seeker.MaxBudget.toLocaleString('da-DK')} kr/md
				</span>
				<span class="bg-muted px-4 py-2 text-sm">
					{seekingTypeLabel[data.seeker.SeekingType ?? ''] ?? 'Hel bolig'}{#if (data.seeker.SeekingType === 'roommate' || data.seeker.SeekingType === 'begge') && data.seeker.NumRooms && data.seeker.NumRooms > 1}
						({data.seeker.NumRooms} værelser)
					{/if}
				</span>
				<span class="bg-muted px-4 py-2 text-sm">
					Indflytning fra: {moveInFrom}
				</span>
				{#if data.seeker.RentalPeriod}
					<span class="bg-muted px-4 py-2 text-sm">
						{rentalPeriodLabel[data.seeker.RentalPeriod] ?? data.seeker.RentalPeriod}{#if data.seeker.RentalPeriod === 'limited' && data.seeker.RentalPeriodDetails}
							: {data.seeker.RentalPeriodDetails}
						{/if}
					</span>
				{/if}
			</div>

			<div class="border-t border-border pt-6">
				<h2 class="font-semibold text-foreground uppercase tracking-wide text-sm mb-3">Beskrivelse</h2>
				<p class="text-muted-foreground whitespace-pre-wrap leading-relaxed">{data.seeker.Description}</p>
			</div>

			{#if data.user && !isOwner}
				<div>
					<ReportButton targetType="seeker" targetId={data.seeker.ID} />
				</div>
			{/if}
		</div>

		<div class="space-y-4">
			{#if isOwner}
				<div class="border border-border p-5">
					<p class="text-sm text-muted-foreground mb-3">Dette er dit eget opslag.</p>
					<a
						href="/dashboard/seekers/{data.seeker.ID}/edit"
						class="block w-full text-center bg-primary text-primary-foreground font-semibold px-4 py-2 text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
					>
						Rediger opslag
					</a>
				</div>
			{:else}
				<div class="border border-border p-5">
					<h3 class="font-semibold text-foreground uppercase tracking-wide text-sm mb-3">Kontakt lejer</h3>

					{#if form?.success}
						<p class="text-sm text-green-700 bg-green-50 p-3">
							Din besked er sendt! Lejeren kontakter dig snart.
						</p>
					{:else if !data.user}
						<p class="text-sm text-muted-foreground mb-3">Du skal være logget ind for at kontakte lejeren.</p>
						<a
							href="/login"
							class="block w-full text-center bg-primary text-primary-foreground font-semibold px-4 py-2 text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
						>
							Log ind
						</a>
					{:else}
						<form method="POST" action="?/contact" use:enhance class="space-y-3">
							{#if form?.error}
								<p class="text-sm text-red-600">{form.error}</p>
							{/if}
							<input
								name="senderPhone"
								type="tel"
								placeholder="Telefon (valgfrit)"
								class="w-full border border-border px-3 py-2 text-sm"
							/>
							<textarea
								name="message"
								rows="4"
								placeholder="Skriv en besked til lejeren..."
								required
								class="w-full border border-border px-3 py-2 text-sm"
							></textarea>
							<button
								type="submit"
								class="w-full bg-primary text-primary-foreground font-semibold px-4 py-2 text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
							>
								Send besked
							</button>
						</form>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

{#if lightboxIdx !== null}
	<div
		class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
		onclick={() => (lightboxIdx = null)}
		role="dialog"
		aria-modal="true"
	>
		<button
			class="absolute top-4 right-4 text-white/80 hover:text-white"
			onclick={() => (lightboxIdx = null)}
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		{#if data.seeker.Images.length > 1}
			<button
				class="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-2"
				onclick={(e) => { e.stopPropagation(); prevImage(); }}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				class="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-2"
				onclick={(e) => { e.stopPropagation(); nextImage(); }}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
		<img
			src={data.seeker.Images[lightboxIdx]}
			alt="{data.seeker.Title} {lightboxIdx + 1}"
			class="max-w-[90vw] max-h-[85vh] object-contain"
			onclick={(e) => e.stopPropagation()}
		/>
		<p class="absolute bottom-4 text-white/60 text-sm">{lightboxIdx + 1} / {data.seeker.Images.length}</p>
	</div>
{/if}
