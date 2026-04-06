<script lang="ts">
	import { enhance } from '$app/forms';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
	<nav class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
		<a href="/" class="text-lg font-bold tracking-tight text-blue-600 hover:text-blue-700">
			Lejematch
		</a>

		<div class="flex items-center gap-1">
			<a
				href="/listings"
				class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
			>
				Boliger
			</a>

			{#if data.user}
				<a
					href="/dashboard"
					class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
				>
					Dashboard
				</a>
				<a
					href="/dashboard/indstillinger"
					class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
				>
					{data.user.email}
				</a>
				<form method="POST" action="/logout" use:enhance>
					<button
						type="submit"
						class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
					>
						Log ud
					</button>
				</form>
			{:else}
				<a
					href="/login"
					class="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
				>
					Log ind
				</a>
				<a
					href="/register"
					class="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
				>
					Opret konto
				</a>
			{/if}
		</div>
	</nav>
</header>

{@render children()}
