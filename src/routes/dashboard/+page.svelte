<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard – Lejematch</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-8">
	<h1 class="mb-2 text-3xl font-bold text-gray-900">Velkommen</h1>
	<p class="text-gray-500">{data.user?.email}</p>

	<section class="mt-8">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold text-gray-800">Dine opslag</h2>
			<a
				href="/dashboard/listings/new"
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
			>
				+ Nyt opslag
			</a>
		</div>

		{#if data.listings.length === 0}
			<p class="mt-4 text-gray-500">Du har ingen aktive opslag endnu.</p>
		{:else}
			<ul class="mt-4 space-y-3">
				{#each data.listings as listing (listing.ID)}
					<li class="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
						<div>
							<p class="font-medium text-gray-900">{listing.Title}</p>
							<p class="text-sm text-gray-500">{listing.City} · {listing.Price.toLocaleString('da-DK')} kr/md.</p>
						</div>
						<div class="flex gap-2">
							<a
								href="/listings/{listing.ID}"
								class="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
							>
								Se
							</a>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>
