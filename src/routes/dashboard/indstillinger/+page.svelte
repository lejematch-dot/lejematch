<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Indstillinger – LejeMatch</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Konto</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Indstillinger</h1>
	</div>

	<!-- Edit profile -->
	<section class="mb-6 border border-border p-6">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Profil</h2>

		{#if form?.action === 'profile' && form?.error}
			<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
		{/if}
		{#if form?.action === 'profile' && form?.success}
			<p class="mb-4 px-4 py-3 text-sm text-primary border border-primary/30 bg-primary/5">Profil opdateret.</p>
		{/if}

		<form method="POST" action="?/updateProfile" use:enhance class="space-y-4">
			<div>
				<label for="DisplayName" class="block text-sm font-medium text-foreground mb-1">Visningsnavn</label>
				<input
					id="DisplayName"
					name="DisplayName"
					type="text"
					value={data.profile.displayName}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div>
				<label for="Bio" class="block text-sm font-medium text-foreground mb-1">Om mig</label>
				<textarea
					id="Bio"
					name="Bio"
					rows="3"
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				>{data.profile.bio}</textarea>
			</div>
			<div>
				<label for="City" class="block text-sm font-medium text-foreground mb-1">By</label>
				<input
					id="City"
					name="City"
					type="text"
					value={data.profile.city}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div>
				<label for="ImageURL" class="block text-sm font-medium text-foreground mb-1">Profilbillede (URL)</label>
				<input
					id="ImageURL"
					name="ImageURL"
					type="url"
					value={data.profile.imageURL}
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
			>
				Gem profil
			</button>
		</form>
	</section>

	<!-- Change password -->
	<section class="mb-6 border border-border p-6">
		<h2 class="text-sm font-bold text-foreground uppercase tracking-wide mb-4">Skift adgangskode</h2>

		{#if form?.action === 'password' && form?.error}
			<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
		{/if}
		{#if form?.action === 'password' && form?.success}
			<p class="mb-4 px-4 py-3 text-sm text-primary border border-primary/30 bg-primary/5">Adgangskode ændret.</p>
		{/if}

		<form method="POST" action="?/changePassword" use:enhance class="space-y-4">
			<div>
				<label for="CurrentPassword" class="block text-sm font-medium text-foreground mb-1">Nuværende adgangskode</label>
				<input
					id="CurrentPassword"
					name="CurrentPassword"
					type="password"
					required
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<div>
				<label for="NewPassword" class="block text-sm font-medium text-foreground mb-1">Ny adgangskode</label>
				<input
					id="NewPassword"
					name="NewPassword"
					type="password"
					required
					class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<button
				type="submit"
				class="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
			>
				Skift adgangskode
			</button>
		</form>
	</section>

	<!-- Delete account -->
	<section class="border border-destructive p-6">
		<h2 class="text-sm font-bold text-destructive uppercase tracking-wide mb-2">Slet konto</h2>
		<p class="text-sm text-muted-foreground mb-4">Dette sletter din konto og alle dine data permanent. Handlingen kan ikke fortrydes.</p>

		{#if form?.action === 'delete' && form?.error}
			<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
		{/if}

		<form method="POST" action="?/deleteAccount" use:enhance>
			<button
				type="submit"
				class="px-4 py-2 bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-widest hover:bg-destructive/90 transition-colors rounded-md"
				onclick={() => confirm('Er du sikker på, at du vil slette din konto?')}
			>
				Slet konto
			</button>
		</form>
	</section>
</div>
