<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Glemt adgangskode – LejeMatch</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<a
			href="/login"
			class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Tilbage til log ind
		</a>

		<div class="bg-card border border-border p-8">
			<h1 class="text-sm font-bold text-foreground mb-2 text-center uppercase tracking-widest">Glemt adgangskode</h1>
			<p class="text-sm text-muted-foreground text-center mb-6">
				Indtast din e-mail, så sender vi dig et link til at vælge en ny adgangskode.
			</p>

			{#if form?.success}
				<p class="px-4 py-3 text-sm text-green-700 bg-green-50">
					Hvis e-mailen findes hos os, har vi sendt et link til at nulstille din adgangskode.
				</p>
			{:else}
				{#if form?.error}
					<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
				{/if}
				<form method="POST" use:enhance class="space-y-4">
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
					<button
						type="submit"
						class="w-full h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
					>
						Send link
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
