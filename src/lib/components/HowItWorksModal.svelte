<script lang="ts">
	let open = $state(false);
	let activeTab = $state<'udlejer' | 'lejer'>('udlejer');

	const udlejerSteps = [
		'Opret en gratis bruger på LejeMatch.dk',
		'Klik på "Opret et opslag" på LejeMatch.dk',
		'Udfyld de påkrævede felter, herunder en kort beskrivelse af lejemålet og hvad du ønsker af lejeren',
		'Udfyld kontaktformularen, så din fremtidige lejer kan kontakte dig',
		'Vedhæft min. 5 billeder af lejemålet (gode billeder gør en stor forskel!)',
		'Klar til at poste din lejlighed',
		'Scroll gennem listen af potentielle lejere under "Lejere"-siden'
	];

	const lejerSteps = [
		'Opret en gratis bruger på LejeMatch.dk',
		'Klik på "Opret et opslag" på LejeMatch.dk',
		'Udfyld de påkrævede felter, herunder en kort beskrivelse af dig/jer som lejere – hvem er du, hvad laver du, har du erfaring med at bo ude osv. (sælg din case!)',
		'Udfyld kontaktformularen, så du kan kontaktes',
		'Vedhæft minimum 3 billeder af dig/jer',
		'Klar til at poste',
		'Scroll gennem listen af lejligheder på "Boliger"-siden'
	];

	function close() {
		open = false;
	}

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (open && e.key === 'Escape') close();
	}}
/>

<button
	type="button"
	onclick={() => (open = true)}
	class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
>
	<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
	</svg>
	Se flere detaljer
</button>

{#if open}
	<div
		class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
		onclick={close}
		role="dialog"
		aria-modal="true"
		aria-labelledby="how-it-works-title"
	>
		<div
			class="bg-card border border-border max-w-lg w-full max-h-[85vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between p-6 border-b border-border">
				<h2 id="how-it-works-title" class="text-sm font-bold uppercase tracking-widest text-foreground">
					Sådan virker det
				</h2>
				<button
					type="button"
					onclick={close}
					aria-label="Luk"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="grid grid-cols-2 gap-px bg-border border-b border-border">
				<button
					type="button"
					onclick={() => (activeTab = 'udlejer')}
					class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors {activeTab === 'udlejer' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}"
				>
					Skal du udleje?
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'lejer')}
					class="px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors {activeTab === 'lejer' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}"
				>
					Skal du leje?
				</button>
			</div>

			<div class="p-6 space-y-5">
				{#each activeTab === 'udlejer' ? udlejerSteps : lejerSteps as step, i (i)}
					<div class="flex gap-4">
						<div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
							{i + 1}
						</div>
						<p class="text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
