<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.profile.displayName} – Lejematch</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-8">
	<div class="flex items-center gap-5">
		{#if data.profile.imageURL}
			<img
				src={data.profile.imageURL}
				alt={data.profile.displayName}
				class="h-20 w-20 rounded-full object-cover"
			/>
		{:else}
			<div class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
				{data.profile.displayName?.[0]?.toUpperCase() ?? '?'}
			</div>
		{/if}
		<div>
			<h1 class="text-2xl font-bold text-gray-900">{data.profile.displayName}</h1>
			{#if data.profile.city}
				<p class="text-sm text-gray-500">{data.profile.city}</p>
			{/if}
		</div>
	</div>

	{#if data.profile.bio}
		<p class="mt-5 text-gray-700">{data.profile.bio}</p>
	{/if}

	<section class="mt-8">
		<h2 class="mb-4 text-lg font-semibold text-gray-800">Aktive opslag</h2>
		{#if data.listings.length === 0}
			<p class="text-gray-500">Ingen aktive opslag.</p>
		{:else}
			<ul class="space-y-3">
				{#each data.listings as listing (listing.ID)}
					<li>
						<a
							href="/listings/{listing.ID}"
							class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-blue-300 hover:shadow-sm transition"
						>
							<div>
								<p class="font-medium text-gray-900">{listing.Title}</p>
								<p class="text-sm text-gray-500">{listing.City} · {listing.Price.toLocaleString('da-DK')} kr/md.</p>
							</div>
							<span class="text-sm text-blue-600">Se opslag →</span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>
