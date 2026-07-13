<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageUploader from '$lib/components/ImageUploader.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<a
			href="/"
			class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Tilbage
		</a>

		<div class="flex items-center justify-center gap-2 mb-8">
			<div class="w-8 h-8 bg-primary flex items-center justify-center">
				<svg class="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
			</div>
			<span class="text-sm font-bold text-foreground tracking-widest uppercase">LejeMatch</span>
		</div>

		<div class="bg-card border border-border p-8">
			{#if form?.success}
				<h1 class="text-sm font-bold text-foreground mb-2 text-center uppercase tracking-widest">Tjek din e-mail</h1>
				<p class="text-sm text-muted-foreground text-center">
					Vi har sendt et bekræftelseslink til din e-mail. Klik på linket for at aktivere din konto og logge ind.
				</p>
				<a
					href="/login"
					class="block w-full text-center mt-6 h-11 leading-[2.75rem] border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors rounded-md"
				>
					Til log ind
				</a>
			{:else}
			<h1 class="text-sm font-bold text-foreground mb-6 text-center uppercase tracking-widest">Opret profil</h1>

			{#if form?.error}
				<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
			{/if}

			<form method="POST" use:enhance class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="firstName" class="block text-sm font-medium text-foreground mb-1">Fornavn</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							required
							class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
					<div>
						<label for="lastName" class="block text-sm font-medium text-foreground mb-1">Efternavn</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							required
							class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-foreground mb-1">E-mail</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="phone" class="block text-sm font-medium text-foreground mb-1">Telefon</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="city" class="block text-sm font-medium text-foreground mb-1">By</label>
					<input
						id="city"
						name="city"
						type="text"
						required
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-foreground mb-1">Adgangskode</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						minlength="8"
						class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-foreground mb-1">Profilbillede *</label>
					<ImageUploader name="ImageURL" multiple={false} endpoint="/api/uploads/registration" />
				</div>
				<button
					type="submit"
					class="w-full h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
				>
					Opret profil
				</button>
			</form>

			<p class="text-xs text-muted-foreground text-center mt-6">
				Har du allerede en konto?{' '}
				<a href="/login" class="text-primary font-medium hover:underline">Log ind</a>
			</p>
			{/if}
		</div>
	</div>
</div>
