<script lang="ts">
	import { enhance } from '$app/forms';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
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
			<h1 class="text-sm font-bold text-foreground mb-6 text-center uppercase tracking-widest">Log ind</h1>

			{#if form?.error}
				<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
			{/if}

			<form method="POST" action="?/login" use:enhance class="space-y-4">
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
					<div class="flex items-center justify-between mb-1">
						<label for="password" class="block text-sm font-medium text-foreground">Adgangskode</label>
						<a href="/glemt-adgangskode" class="text-xs text-primary hover:underline">Glemt adgangskode?</a>
					</div>
					<PasswordInput id="password" name="password" required autocomplete="current-password" />
				</div>
				<button
					type="submit"
					class="w-full h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
				>
					Log ind
				</button>
			</form>

			<p class="text-xs text-muted-foreground text-center mt-6">
				Har du ikke en konto?{' '}
				<a href="/register" class="text-primary font-medium hover:underline">Opret profil</a>
			</p>
		</div>
	</div>
</div>
