<script lang="ts">
	import ReportButton from '$lib/components/ReportButton.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-3xl mx-auto px-4 py-8">
	<div class="flex items-center gap-5 mb-6">
		{#if data.profile.imageURL}
			<img
				src={data.profile.imageURL}
				alt={data.profile.displayName}
				class="w-20 h-20 object-cover"
			/>
		{:else}
			<div class="w-20 h-20 bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
				{data.profile.displayName?.[0]?.toUpperCase() ?? '?'}
			</div>
		{/if}
		<div>
			<h1 class="text-2xl font-bold text-foreground uppercase tracking-wide">{data.profile.displayName}</h1>
			{#if data.profile.city}
				<div class="flex items-center gap-1 text-sm text-muted-foreground mt-1">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					{data.profile.city}
				</div>
			{/if}
			<div class="flex items-center gap-2 mt-2">
				{#if data.profile.age}
					<span class="text-xs text-muted-foreground">{data.profile.age} år</span>
				{/if}
			</div>
			{#if data.user}
				<div class="mt-2">
					<ReportButton targetType="profile" targetId={data.profileUserId} />
				</div>
			{/if}
		</div>
	</div>

	{#if data.profile.bio}
		<p class="text-muted-foreground leading-relaxed mb-8 border-t border-border pt-6">{data.profile.bio}</p>
	{/if}

	<section class="{data.profile.bio ? '' : 'border-t border-border pt-6'}">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Aktive opslag</h2>
		{#if data.listings.length === 0}
			<div class="border border-border p-8 text-center">
				<p class="text-sm text-muted-foreground">Ingen aktive opslag.</p>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.listings as listing (listing.ID)}
					<a
						href="/listings/{listing.ID}"
						class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors"
					>
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{listing.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">{listing.City} · {listing.Price.toLocaleString('da-DK')} kr/md.</p>
						</div>
						<span class="text-xs text-primary uppercase tracking-wide">Se opslag →</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<section class="mt-10">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Søger</h2>
		{#if data.seekers.length === 0}
			<div class="border border-border p-8 text-center">
				<p class="text-sm text-muted-foreground">Søger ikke aktivt noget lige nu.</p>
			</div>
		{:else}
			<div class="border border-border gap-px bg-border flex flex-col">
				{#each data.seekers as seeker (seeker.ID)}
					<a
						href="/lejere/{seeker.ID}"
						class="flex items-center justify-between bg-background px-5 py-4 hover:bg-muted transition-colors"
					>
						<div>
							<p class="font-bold text-foreground text-sm uppercase tracking-wide">{seeker.Title}</p>
							<p class="text-xs text-muted-foreground mt-0.5">
								{seeker.City} · Max {seeker.MaxBudget.toLocaleString('da-DK')} kr/md.
							</p>
						</div>
						<span class="text-xs text-primary uppercase tracking-wide">Se opslag →</span>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</div>
