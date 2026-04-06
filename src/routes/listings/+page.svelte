<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const roomTypeLabel: Record<string, string> = {
		private: 'Privat værelse',
		shared: 'Delt værelse',
		apartment: 'Lejlighed'
	};
</script>

<svelte:head>
	<title>Boliger – Lejematch</title>
</svelte:head>

<main class="mx-auto max-w-5xl px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold text-gray-900">Find din næste bolig</h1>

	{#if data.listings.length === 0}
		<p class="text-gray-500">Ingen boliger fundet.</p>
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.listings as listing (listing.ID)}
				<li>
					<a
						href="/listings/{listing.ID}"
						class="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
					>
						{#if listing.Images?.length}
							<img
								src={listing.Images[0]}
								alt={listing.Title}
								class="mb-4 h-40 w-full rounded-xl object-cover"
							/>
						{/if}
						<p class="text-xs font-medium uppercase tracking-wide text-blue-600">
							{roomTypeLabel[listing.RoomType] ?? listing.RoomType}
						</p>
						<h2 class="mt-1 text-base font-semibold text-gray-900">{listing.Title}</h2>
						<p class="text-sm text-gray-500">{listing.City}</p>
						<p class="mt-2 text-lg font-bold text-gray-800">{listing.Price.toLocaleString('da-DK')} kr/md.</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
