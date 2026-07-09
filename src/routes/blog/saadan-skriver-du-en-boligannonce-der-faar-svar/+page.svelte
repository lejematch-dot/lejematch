<script lang="ts">
	import { blogPosts } from '$lib/blog';

	const post = blogPosts.find((p) => p.slug === 'saadan-skriver-du-en-boligannonce-der-faar-svar')!;

	const checklist = [
		'Skarpe, ærlige billeder af alle rum i dagslys',
		'Adresse eller område, størrelse og antal værelser',
		'Husleje, depositum og forudbetalt leje tydeligt angivet — og inden for lovens grænser',
		'Indflytningsdato og eventuelle vilkår (kæledyr, møblering m.m.)',
		'Kort om beliggenhed og nærhed til transport/uddannelse',
		'Tilbud om fysisk fremvisning',
		'Realistisk pris sammenlignet med lignende boliger i området'
	];
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<a
		href="/blog"
		class="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-widest mb-6 transition-colors"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Blog
	</a>

	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">{post.dateLabel}</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">
		Sådan skriver du en boligannonce, der får svar
	</h1>

	<div class="space-y-8 text-muted-foreground leading-relaxed">
		<div class="space-y-4 text-sm">
			<p>
				Skal du leje din bolig ud, kender du sikkert følelsen: du lægger et opslag op, og enten sker der
				ingenting, eller også bliver du oversvømmet med henvendelser fra folk, der tydeligvis ikke har læst
				annoncen. Begge dele koster tid. En god boligannonce gør forskellen — den tiltrækker de rigtige
				boligsøgende og sorterer resten fra, allerede før de skriver til dig.
			</p>
			<p>Her er, hvad der faktisk virker.</p>
		</div>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Billeder gør det halve arbejde</h2>
			<div class="space-y-3 text-sm">
				<p>
					De fleste boligsøgende afgør på få sekunder, om de vil klikke videre på en annonce — og det er
					billederne, der afgør det. Tag dem i dagslys, gerne midt på dagen, og få alle rum med, inklusive
					badeværelse og køkken. Ryd op, før du fotograferer; et rodet rum distraherer fra boligen selv.
				</p>
				<p>
					Vælg dit skarpeste og mest indbydende billede som forsidebillede — det er det første, folk ser, og
					det afgør, om de overhovedet åbner annoncen. Undgå at bruge gamle eller misvisende billeder. Ud over
					at det skaber skuffede fremvisninger, er det også noget, der får boligsøgende til at blive
					mistænksomme — falske boligannoncer er desværre udbredte, og ærlige, opdaterede billeder er noget af
					det, der adskiller dig fra dem.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
				Skriv en tekst, der rent faktisk svarer på spørgsmålene
			</h2>
			<p class="text-sm mb-3">Jo mere præcis information du giver, jo færre unødvendige henvendelser får du. Sørg for, at annoncen indeholder:</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li>Adresse eller område, boligtype og antal kvadratmeter</li>
				<li>Antal værelser og om boligen er møbleret</li>
				<li>Husleje, depositum, forudbetalt leje og eventuelle forbrugsudgifter</li>
				<li>Ønsket indflytningsdato</li>
				<li>Om kæledyr er tilladt</li>
				<li>Kort beskrivelse af boligens stand og eventuelle særlige forhold</li>
			</ul>
			<p class="text-sm mb-3">
				Beskriv også, hvad der ligger tæt på — offentlig transport, indkøbsmuligheder, og
				uddannelsesinstitutioner, hvis du henvender dig til studerende. Jo mere konkret informationen er, jo mere
				tillid skaber den, og jo mere kvalificerede bliver de henvendelser, du får.
			</p>
			<p class="text-sm">
				Undgå vage vendinger som "central beliggenhed" eller "flot lejlighed" uden at underbygge dem. Skriv i
				stedet, hvor langt der faktisk er til stationen, eller hvorfor lejligheden er flot — er det lyset, det
				nyistandsatte køkken, eller udsigten? Konkrete detaljer overbeviser langt bedre end overordnede floskler.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Overskriften er det første, folk læser</h2>
			<p class="text-sm">
				De fleste boligportaler viser overskriften, før den boligsøgende overhovedet klikker sig ind. En god
				overskrift er kort og konkret: boligtype, antal værelser og område er ofte nok. "3-værelses lejlighed
				nær Nørreport, ledig 1. september" fortæller mere på få sekunder end en kreativ, men uklar overskrift.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Kend din målgruppe</h2>
			<p class="text-sm">
				Overvej, hvem boligen passer bedst til, og skriv annoncen derefter. Studerende og unge i de store byer
				leder typisk efter noget centralt, tæt på uddannelsessted og med god forbindelse til offentlig transport
				— og de er ofte prisbevidste. Familier vil typisk spørge ind til institutioner, skoler og trygge
				omgivelser. Ved at ramme den rigtige målgruppe direkte i teksten sparer du tid på henvendelser, der
				alligevel ikke ville føre til noget.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Timing betyder mere, end du tror</h2>
			<p class="text-sm">
				Er din bolig relevant for studerende, stiger efterspørgslen kraftigt op til studiestart i august og
				september samt omkring februar, hvor mange uddannelser også optager nye studerende. Læg din annonce op i
				god tid, men vær samtidig realistisk om indflytningsdatoen — mange boligsøgende i den periode har travlt
				og reagerer bedst på annoncer, hvor det er tydeligt, hvornår de faktisk kan flytte ind.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Sæt en realistisk pris</h2>
			<p class="text-sm">
				En for høj husleje skræmmer seriøse lejere væk, mens en meget lav pris i forhold til området omvendt kan
				få boligsøgende til at blive mistænksomme over, om annoncen overhovedet er ægte — urealistisk lave
				priser er netop et af de kendetegn, folk er blevet opfordret til at holde øje med i forbindelse med
				boligsvindel. Tjek, hvad lignende boliger i området udlejes til, før du sætter din pris.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
				Vær tydelig om depositum og forudbetalt leje
			</h2>
			<p class="text-sm italic mb-3">Dette afsnit er vejledende og skal ikke betragtes som juridisk rådgivning.</p>
			<p class="text-sm mb-3">Skriv tydeligt, hvad du forventer i depositum og forudbetalt leje — og hold dig inden for lejelovens grænser:</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li>Depositum må højst svare til 3 måneders husleje.</li>
				<li>Forudbetalt leje må højst udgøre 3 måneders husleje.</li>
				<li>De to beløb må tilsammen højst svare til 6 måneders husleje.</li>
			</ul>
			<p class="text-sm">
				Mange boligsøgende har efterhånden sat sig ind i disse regler — blandt andet fordi høje eller uklare
				depositumkrav er et kendt advarselstegn på svindel med lejebolig. Er du tydelig og lovlig i din annonce
				fra starten, signalerer det, at du er en seriøs udlejer, og du undgår mistænksomme spørgsmål, før de
				overhovedet opstår.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Signalér tydeligt, at du er en ægte udlejer</h2>
			<p class="text-sm mb-3">
				Fordi der desværre findes en del svindel med lejebolig, er boligsøgende blevet mere forsigtige — med god
				grund. Du kan gøre det let for dem at stole på dig ved at:
			</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li>Bruge dit rigtige navn og være åben om, hvem du er.</li>
				<li>Tilbyde fysisk fremvisning af boligen, før nogen skal betale noget som helst.</li>
				<li>Aldrig bede om depositum eller betaling før fremvisning.</li>
				<li>Svare via platformen frem for at flytte samtalen ud på beskeder eller e-mail for hurtigt.</li>
				<li>Være åben om ejerforhold, hvis en potentiel lejer spørger.</li>
			</ul>
			<p class="text-sm">Det er ikke bare god skik — det gør også, at din annonce skiller sig positivt ud fra de useriøse.</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Svar hurtigt — og hold svarene på platformen</h2>
			<div class="space-y-3 text-sm">
				<p>
					Boligsøgende skriver ofte til flere annoncer samtidig, og de går typisk videre med den udlejer, der
					svarer først og mest konkret. Sæt dig for at svare inden for et døgn, gerne hurtigere. Et kort,
					konkret svar med forslag til fremvisningstidspunkt gør mere for din annonce end lange, generelle
					beskeder.
				</p>
				<p>
					Hold også korrespondancen på platformen, i det mindste indtil I har aftalt en fremvisning. Det giver
					begge parter et sted at vende tilbage til, hvis der senere skulle opstå tvivl om, hvad der er
					aftalt.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Tjekliste til den gode boligannonce</h2>
			<ul class="space-y-2 text-sm">
				{#each checklist as item (item)}
					<li class="flex items-start gap-2">
						<span class="mt-0.5 w-4 h-4 border border-border shrink-0"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Når henvendelserne begynder at komme ind</h2>
			<p class="text-sm">
				En god annonce filtrerer allerede en del fra, men det er stadig værd at bruge lidt tid på dem, der
				skriver. Mød gerne interesserede lejere fysisk, før I aftaler noget endeligt, og stil de spørgsmål, der
				er vigtige for dig — om indflytningsdato, husstandens størrelse, eller hvad boligen skal bruges til. En
				kort samtale kan spare jer begge for misforståelser senere.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Til sidst</h2>
			<p class="text-sm">
				En ærlig, detaljeret annonce er den bedste investering, du kan gøre som udlejer — den sparer tid,
				tiltrækker seriøse lejere og opbygger tillid fra første klik. På LejeMatch skal brugere være logget ind
				for at kontakte hinanden, og alle opslag kan rapporteres, hvis noget virker forkert. Men den bedste
				boligannonce er stadig den, der er ærlig og præcis fra starten.
			</p>
		</section>
	</div>

	<div class="mt-14 pt-8 border-t border-border">
		<a
			href="/dashboard/listings/new"
			class="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
		>
			Opret opslag
		</a>
	</div>
</div>
