<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Indstillinger – Lejematch</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Indstillinger</h1>

	<!-- Edit profile -->
	<section class="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
		<h2 class="mb-4 text-lg font-semibold text-gray-800">Profil</h2>

		{#if form?.action === 'profile' && form?.error}
			<p class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
		{/if}
		{#if form?.action === 'profile' && form?.success}
			<p class="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Profil opdateret.</p>
		{/if}

		<form method="POST" action="?/updateProfile" use:enhance class="space-y-4">
			<div>
				<label for="DisplayName" class="block text-sm font-medium text-gray-700">Visningsnavn</label>
				<input
					id="DisplayName"
					name="DisplayName"
					type="text"
					value={data.profile.displayName}
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="Bio" class="block text-sm font-medium text-gray-700">Om mig</label>
				<textarea
					id="Bio"
					name="Bio"
					rows="3"
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				>{data.profile.bio}</textarea>
			</div>
			<div>
				<label for="City" class="block text-sm font-medium text-gray-700">By</label>
				<input
					id="City"
					name="City"
					type="text"
					value={data.profile.city}
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="ImageURL" class="block text-sm font-medium text-gray-700">Profilbillede (URL)</label>
				<input
					id="ImageURL"
					name="ImageURL"
					type="url"
					value={data.profile.imageURL}
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
			>
				Gem profil
			</button>
		</form>
	</section>

	<!-- Change password -->
	<section class="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
		<h2 class="mb-4 text-lg font-semibold text-gray-800">Skift adgangskode</h2>

		{#if form?.action === 'password' && form?.error}
			<p class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
		{/if}
		{#if form?.action === 'password' && form?.success}
			<p class="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Adgangskode ændret.</p>
		{/if}

		<form method="POST" action="?/changePassword" use:enhance class="space-y-4">
			<div>
				<label for="CurrentPassword" class="block text-sm font-medium text-gray-700">Nuværende adgangskode</label>
				<input
					id="CurrentPassword"
					name="CurrentPassword"
					type="password"
					required
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label for="NewPassword" class="block text-sm font-medium text-gray-700">Ny adgangskode</label>
				<input
					id="NewPassword"
					name="NewPassword"
					type="password"
					required
					class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
			>
				Skift adgangskode
			</button>
		</form>
	</section>

	<!-- Delete account -->
	<section class="rounded-2xl border border-red-200 bg-white p-6">
		<h2 class="mb-2 text-lg font-semibold text-red-700">Slet konto</h2>
		<p class="mb-4 text-sm text-gray-600">Dette sletter din konto og alle dine data permanent. Handlingen kan ikke fortrydes.</p>

		{#if form?.action === 'delete' && form?.error}
			<p class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{form.error}</p>
		{/if}

		<form method="POST" action="?/deleteAccount" use:enhance>
			<button
				type="submit"
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
				onclick={() => confirm('Er du sikker på, at du vil slette din konto?')}
			>
				Slet konto
			</button>
		</form>
	</section>
</main>
