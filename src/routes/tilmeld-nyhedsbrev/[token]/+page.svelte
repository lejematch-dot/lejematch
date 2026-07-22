<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Tilmeld nyhedsbrev – LejeMatch</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<div class="bg-card border border-border p-8 text-center">
			{#if data.success}
				<h1 class="text-sm font-bold text-foreground mb-2 uppercase tracking-widest">Tilmeldt</h1>
				<p class="text-sm text-muted-foreground mb-6">
					Du er nu tilmeldt LejeMatchs nyhedsbreve. Du kan altid afmelde dig igen via linket i selve mailen.
				</p>
			{:else}
				<h1 class="text-sm font-bold text-foreground mb-2 uppercase tracking-widest">Linket er ugyldigt</h1>
				<p class="text-sm text-muted-foreground mb-6">Linket er ugyldigt eller udløbet.</p>
			{/if}
			<a
				href="/"
				class="block w-full text-center h-11 leading-[2.75rem] border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors rounded-md"
			>
				Til forsiden
			</a>
		</div>
	</div>
</div>
