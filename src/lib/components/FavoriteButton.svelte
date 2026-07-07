<script lang="ts">
	import type { FavoriteType } from '$lib/types/favorite';

	let {
		favoriteType,
		favoriteId,
		initialFavorited = false,
		variant = 'overlay'
	}: {
		favoriteType: FavoriteType;
		favoriteId: number;
		initialFavorited?: boolean;
		/** "overlay" (default) — for use on top of images, with a dark pill background.
		 *  "plain" — for use on a normal background, no pill, just the heart. */
		variant?: 'overlay' | 'plain';
	} = $props();

	let isFavorite = $state(initialFavorited);
	let loading = $state(false);

	async function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (loading) return;

		const next = !isFavorite;
		isFavorite = next;
		loading = true;

		try {
			const res = await fetch('/api/favorites', {
				method: next ? 'POST' : 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ favoriteType, favoriteId })
			});
			if (!res.ok) throw new Error('request failed');
		} catch {
			isFavorite = !next;
		} finally {
			loading = false;
		}
	}
</script>

<button
	onclick={toggle}
	aria-label={isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
	class="rounded-full transition-colors {variant === 'plain'
		? `flex items-center gap-1.5 px-1.5 py-1 ${isFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`
		: `p-1.5 ${
				isFavorite
					? 'text-red-500 bg-background/80'
					: 'text-background/70 hover:text-red-400 bg-foreground/20 hover:bg-foreground/30'
			}`}"
>
	{#if variant === 'plain'}
		<span class="text-xs font-medium">{isFavorite ? 'Gemt som favorit' : 'Gem som favorit'}</span>
	{/if}
	<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.8">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 20.25c0-.007-9-5.02-9-11.25C3 5.765 5.1 3.75 7.688 3.75c1.935 0 3.597 1.126 4.312 2.733.715-1.607 2.377-2.733 4.313-2.733C18.9 3.75 21 5.765 21 9c0 6.23-9 11.25-9 11.25z"
		/>
	</svg>
</button>
