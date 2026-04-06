<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Opret konto – Lejematch</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-50 p-4">
	<div class="w-full max-w-sm rounded-2xl bg-white p-8 shadow">
		<h1 class="mb-6 text-2xl font-bold text-gray-900">Opret konto</h1>

		{#if form?.error}
			<p class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
		{/if}

		<form method="POST" use:enhance class="space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Navn</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Adgangskode</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					minlength="8"
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Opret konto
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Har du allerede en konto? <a href="/login" class="text-blue-600 hover:underline">Log ind</a>
		</p>
	</div>
</main>
