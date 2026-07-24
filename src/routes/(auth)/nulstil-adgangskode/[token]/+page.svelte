<script lang="ts">
	import { enhance } from '$app/forms';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Nulstil adgangskode – LejeMatch</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<div class="bg-card border border-border p-8">
			<h1 class="text-sm font-bold text-foreground mb-6 text-center uppercase tracking-widest">Vælg ny adgangskode</h1>

			{#if form?.success}
				<p class="px-4 py-3 text-sm text-green-700 bg-green-50 mb-4">
					Din adgangskode er nulstillet.
				</p>
				<a
					href="/login"
					class="block w-full text-center h-11 leading-[2.75rem] bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
				>
					Log ind
				</a>
			{:else}
				{#if form?.error}
					<p class="mb-4 px-4 py-3 text-sm text-destructive border border-destructive/30 bg-destructive/5">{form.error}</p>
				{/if}
				<form method="POST" use:enhance class="space-y-4">
					<div>
						<label for="newPassword" class="block text-sm font-medium text-foreground mb-1">Ny adgangskode</label>
						<PasswordInput id="newPassword" name="newPassword" required minlength={8} autocomplete="new-password" />
					</div>
					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-foreground mb-1">Bekræft adgangskode</label>
						<PasswordInput id="confirmPassword" name="confirmPassword" required minlength={8} autocomplete="new-password" />
					</div>
					<button
						type="submit"
						class="w-full h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
					>
						Gem ny adgangskode
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
