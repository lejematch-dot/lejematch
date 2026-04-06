<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const roomTypeLabel: Record<string, string> = {
		private: 'Privat værelse',
		shared: 'Delt værelse',
		apartment: 'Lejlighed'
	};

	const availableFrom = $derived(
		new Date(data.listing.AvailableFrom).toLocaleDateString('da-DK', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{data.listing.Title} – Lejematch</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-8">
	<a href="/listings" class="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline">
		← Tilbage til oversigt
	</a>

	{#if data.listing.Images?.length}
		<div class="mb-6 grid gap-2 sm:grid-cols-2">
			{#each data.listing.Images as src, i (i)}
				<img src={src} alt="{data.listing.Title} billede {i + 1}" class="rounded-xl object-cover w-full h-48" />
			{/each}
		</div>
	{/if}

	<p class="text-xs font-medium uppercase tracking-wide text-blue-600">
		{roomTypeLabel[data.listing.RoomType] ?? data.listing.RoomType}
	</p>
	<h1 class="mt-1 text-3xl font-bold text-gray-900">{data.listing.Title}</h1>
	<p class="mt-1 text-gray-500">{data.listing.City}</p>
	<p class="mt-3 text-2xl font-bold text-gray-800">{data.listing.Price.toLocaleString('da-DK')} kr/md.</p>
	<p class="mt-1 text-sm text-gray-500">Ledig fra: {availableFrom}</p>

	<div class="mt-6 prose prose-gray max-w-none">
		<p>{data.listing.Description}</p>
	</div>
</main>
