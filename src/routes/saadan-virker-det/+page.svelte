<script lang="ts">
	let activeTab = $state<'udlejer' | 'lejer'>('udlejer');

	const udlejerSteps = [
		{
			title: 'Opret en gratis profil',
			body: 'Opret din bruger på LejeMatch med e-mail og adgangskode. Det tager under et minut, og det er helt gratis — der er ingen abonnementer eller skjulte gebyrer, uanset hvor mange boliger du udlejer.',
			image: '/guide/01-register.png',
			alt: 'Opret profil-siden på LejeMatch'
		},
		{
			title: 'Opret dit boligopslag',
			body: 'Klik på "Opret opslag" og udfyld boligens detaljer: pris, by, boligtype, ledig-dato og en beskrivelse af boligen og hvem du gerne vil leje ud til. Vedhæft minimum 5 billeder — gode billeder gør en markant forskel for, hvor mange henvendelser du får. Opslaget er live med det samme.',
			image: '/guide/02-create-listing.png',
			alt: 'Formularen til at oprette et boligopslag'
		},
		{
			title: 'Gå selv på jagt efter lejere',
			body: 'Vent ikke bare på henvendelser — under "Lejere" kan du se alle boligsøgendes egne opslag, hvor de beskriver sig selv, deres budget og hvornår de ønsker at flytte ind. Filtrér på by og budget, og tag selv kontakt til dem, der matcher det, du søger.',
			image: '/guide/03-browse-lejere.png',
			alt: 'Lejere-siden med opslag fra boligsøgende'
		},
		{
			title: 'Modtag henvendelser i din indbakke',
			body: 'Når en boligsøgende kontakter dig, lander beskeden i din indbakke under "Beskeder". Mange vælger frivilligt at oplyse antal personer, alder, forhold (par, familie, venner) og beskæftigelse i deres henvendelse — det vises som små badges på beskeden, så du hurtigt kan danne dig et overblik uden at skulle læse hele beskeden.',
			image: '/guide/04-inbox-badges.png',
			alt: 'Indbakke med en henvendelse og demografi-badges'
		},
		{
			title: 'Organisér med det private mærkningssystem',
			body: 'Du kan give hver henvendelse en rød, gul eller grøn markering — helt privat, kun synligt for dig. Brug det til at holde styr på, hvem du er mest interesseret i at gå videre med, hvem du overvejer, og hvem der ikke er relevant. Du kan filtrere din indbakke efter markering, så du hurtigt finder de rigtige samtaler igen.',
			image: '/guide/04b-category-tagging.png',
			alt: 'En henvendelse markeret grøn med det private mærkningssystem'
		},
		{
			title: 'Svar direkte på platformen',
			body: 'Al kommunikation foregår i tråde, direkte inde på LejeMatch — du behøver ikke skifte til e-mail eller SMS. Klik "Vis samtale" på en henvendelse for at se hele forløbet og svare. Det holder alt ét sted, og den anden part får automatisk en e-mail-notifikation, når du svarer.',
			image: '/guide/07-thread-reply.png',
			alt: 'En trådet samtale med svar direkte på platformen'
		},
		{
			title: 'Hold dit opslag opdateret',
			body: 'Så snart boligen er udlejet, bør du deaktivere opslaget, så du undgår unødvendige henvendelser. Hvis et opslag har stået aktivt i lang tid, sender vi automatisk en påmindelses-mail, der spørger, om det stadig er aktuelt — så dine gamle opslag ikke bare støver til og forvirrer boligsøgende.',
			image: '/guide/08-manage-listing.png',
			alt: 'Redigering af et opslag med status-feltet'
		}
	];

	const lejerSteps = [
		{
			title: 'Opret en gratis profil',
			body: 'Opret din bruger på LejeMatch med e-mail og adgangskode. Det tager under et minut og er helt gratis.',
			image: '/guide/01-register.png',
			alt: 'Opret profil-siden på LejeMatch'
		},
		{
			title: 'Opret dit "søger bolig"-opslag',
			body: 'Klik på "Opret opslag" og fortæl om dig selv: hvem er du/I, hvad laver du, hvad er dit budget, og hvornår vil du gerne flytte ind. Beskriv gerne din situation ærligt og konkret — jo mere en udlejer kan se, hvem du er, jo større er chancen for at blive kontaktet. Vedhæft minimum 3 billeder af dig/jer.',
			image: '/guide/05-create-seeker.png',
			alt: 'Formularen til at oprette et "søger bolig"-opslag'
		},
		{
			title: 'Gå selv på jagt efter boliger',
			body: 'Vent ikke bare på svar — under "Boliger" kan du se alle aktive boligopslag med billeder, pris, by og beskrivelse. Filtrér på by, pris og boligtype, og tag selv kontakt til de udlejere, der har noget, der passer til dig.',
			image: '/guide/06-browse-boliger.png',
			alt: 'Boliger-siden med aktive boligopslag'
		},
		{
			title: 'Send og modtag beskeder',
			body: 'Når du kontakter en udlejer, kan du frivilligt oplyse antal personer, alder, forhold og beskæftigelse — det gør det nemmere for udlejeren hurtigt at danne sig et indtryk af jer. Svar fra udlejere lander i din indbakke under "Beskeder", og hele samtalen foregår i en tråd direkte på platformen, så du altid kan finde tilbage til, hvad der er blevet sagt.',
			image: '/guide/07-thread-reply.png',
			alt: 'En trådet samtale med svar direkte på platformen'
		},
		{
			title: 'Hold dit opslag opdateret',
			body: 'Har du fundet en bolig? Deaktivér dit "søger bolig"-opslag, så udlejere ikke bruger tid på at kontakte dig forgæves. Står opslaget aktivt i lang tid, sender vi en automatisk påmindelse, der spørger, om du stadig søger — så du nemt kan opdatere eller fjerne det.',
			image: '/guide/08-manage-listing.png',
			alt: 'Redigering af et opslag med status-feltet'
		}
	];

	const steps = $derived(activeTab === 'udlejer' ? udlejerSteps : lejerSteps);
</script>

<div class="max-w-4xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Guide</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-tight">Sådan virker det</h1>
	<p class="text-sm text-muted-foreground leading-relaxed mb-10 max-w-xl">
		Uanset om du udlejer en bolig eller leder efter en, foregår alt på LejeMatch — fra opslag og søgning til
		beskeder og svar. Vælg din situation nedenfor for en trin-for-trin guide med skærmbilleder af hvert trin.
	</p>

	<div class="grid grid-cols-2 gap-px bg-border border border-border mb-12 max-w-xl">
		<button
			type="button"
			onclick={() => (activeTab = 'udlejer')}
			class="px-4 py-4 text-xs font-bold uppercase tracking-widest transition-colors {activeTab === 'udlejer' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}"
		>
			Jeg skal udleje
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'lejer')}
			class="px-4 py-4 text-xs font-bold uppercase tracking-widest transition-colors {activeTab === 'lejer' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'}"
		>
			Jeg skal leje
		</button>
	</div>

	<div class="space-y-14">
		{#each steps as step, i (step.title)}
			<div class="flex gap-5">
				<div class="flex flex-col items-center shrink-0">
					<div class="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
						{i + 1}
					</div>
					{#if i < steps.length - 1}
						<div class="w-px flex-1 bg-border mt-2"></div>
					{/if}
				</div>
				<div class="pb-1 min-w-0 flex-1">
					<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2 pt-1">{step.title}</h2>
					<p class="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">{step.body}</p>
					<div class="border border-border bg-muted overflow-hidden max-w-xl">
						<img src={step.image} alt={step.alt} class="w-full h-auto block" loading="lazy" />
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-14 border-t border-border pt-10">
		<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">God idé at vide</h2>
		<p class="text-sm text-muted-foreground leading-relaxed mb-3">
			Det bedste match kommer sjældent af bare at vente. Uanset om du udlejer eller søger bolig, får du flest
			og bedst svar ved selv at gå på opdagelse i den modsatte liste — udlejere kan browse "Lejere", og
			boligsøgende kan browse "Boliger" — og tage kontakt til dem, der ser ud til at passe.
		</p>
		<p class="text-sm text-muted-foreground leading-relaxed">
			Al kontakt og opfølgning foregår direkte på LejeMatch i tråde, så I altid kan finde tilbage til hele
			samtalen — I behøver aldrig skifte til e-mail eller SMS for at fortsætte dialogen.
		</p>
	</div>

	<div class="mt-10 flex flex-col sm:flex-row gap-3">
		<a
			href={activeTab === 'udlejer' ? '/dashboard/opret' : '/lejere/ny'}
			class="px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors text-center border-2 border-transparent"
		>
			{activeTab === 'udlejer' ? 'Opret boligopslag' : 'Opret "søger bolig"-opslag'}
		</a>
		<a
			href={activeTab === 'udlejer' ? '/lejere' : '/boliger'}
			class="px-8 py-4 bg-background text-foreground font-semibold text-sm uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-center"
		>
			{activeTab === 'udlejer' ? 'Se boligsøgende' : 'Se ledige boliger'}
		</a>
	</div>
</div>
