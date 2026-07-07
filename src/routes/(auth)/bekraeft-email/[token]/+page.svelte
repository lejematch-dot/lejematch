<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Bekræft e-mail – LejeMatch</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<div class="bg-card border border-border p-8 text-center">
			{#if data.success}
				<h1 class="text-sm font-bold text-foreground mb-2 uppercase tracking-widest">E-mail bekræftet</h1>
				<p class="text-sm text-muted-foreground mb-6">Din konto er nu aktiv. Du kan logge ind.</p>
				<a
					href="/login"
					class="block w-full text-center h-11 leading-[2.75rem] bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-md"
				>
					Log ind
				</a>
			{:else}
				<h1 class="text-sm font-bold text-foreground mb-2 uppercase tracking-widest">Linket er ugyldigt</h1>
				<p class="text-sm text-muted-foreground mb-6">
					Linket er ugyldigt eller udløbet. Prøv at logge ind for at bede om et nyt.
				</p>
				<a
					href="/login"
					class="block w-full text-center h-11 leading-[2.75rem] border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors rounded-md"
				>
					Til log ind
				</a>
			{/if}
		</div>
	</div>
</div>
