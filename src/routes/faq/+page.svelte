<script lang="ts">
	const faqs = [
		{
			q: 'Er LejeMatch gratis at bruge?',
			a: 'Ja, helt gratis — det er gratis at oprette en konto, søge boliger, oprette opslag som lejer og kontakte andre brugere, uden gebyrer eller skjulte omkostninger. Vi finansierer driften via annoncer på hjemmesiden i stedet for at tage betaling fra vores brugere.'
		},
		{
			q: 'Hvordan opretter jeg et boligopslag?',
			a: 'Log ind, gå til dit dashboard og vælg "Nyt opslag" → "Bolig". Udfyld pris, beliggenhed, billeder og en beskrivelse, og opslaget er synligt med det samme.'
		},
		{
			q: 'Hvordan finder jeg en roommate eller et sted at bo?',
			a: 'Under "Lejere" kan du enten browse opslag fra andre der søger bolig, eller selv oprette et opslag så udlejere kan finde og kontakte dig.'
		},
		{
			q: 'Hvordan kontakter jeg en udlejer eller lejer?',
			a: 'Du skal være logget ind for at sende en besked. Det sikrer at modtageren kan se hvem der har skrevet, og at I kan finde beskeden igen under "Beskeder" i jeres dashboard.'
		}
	];
</script>

<svelte:head>
	<title>FAQ – LejeMatch</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Ofte stillede spørgsmål</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">FAQ</h1>

	<div class="divide-y divide-border border-t border-b border-border">
		{#each faqs as item (item.q)}
			<div class="py-6">
				<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">{item.q}</h2>
				<p class="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
			</div>
		{/each}
	</div>

	<p class="text-sm text-muted-foreground mt-8">
		Fandt du ikke svar på dit spørgsmål? Skriv til os på
		<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
	</p>
</div>
