<script lang="ts">
	import { CVR_NUMBER } from '$lib/legal';
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Ofte stillede spørgsmål</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">FAQ</h1>

	<div class="space-y-10">
		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Om LejeMatch</h2>
			<div class="divide-y divide-border border-t border-b border-border">
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvad er LejeMatch?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						LejeMatch er en dansk boligplatform, der gør det nemt for udlejere og boligsøgende at finde hinanden.
						Udlejere kan oprette boligopslag, og boligsøgende kan både søge blandt boligerne og oprette deres eget
						"søger bolig"-opslag, som udlejere kan reagere på. Al kontakt sker direkte mellem jer — uden mellemled.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvad koster det?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						LejeMatch er gratis at bruge — både for udlejere og boligsøgende. Du kan oprette profil, slå boliger op
						og kontakte andre brugere uden at betale. Hvis vi på et tidspunkt indfører nye, betalte funktioner, vil
						det blive varslet tydeligt, og det vil ikke ændre de gratis funktioner uden varsel.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvem står bag LejeMatch?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						LejeMatch drives af os{#if CVR_NUMBER}, CVR-nr. {CVR_NUMBER}{/if}. Du kan altid kontakte os på
						<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>
						— vi svarer hurtigst muligt. Læs mere på vores
						<a href="/om-os" class="text-primary font-medium hover:underline">Om os-side</a>.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Profil og opslag</h2>
			<div class="divide-y divide-border border-t border-b border-border">
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvordan opretter jeg et opslag?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Opret en gratis profil, log ind og klik på "Opret opslag". Udfyld oplysningerne om boligen (eller om dig
						selv, hvis du søger bolig), tilføj billeder, og dit opslag er live med det samme.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvor gammel skal jeg være for at bruge LejeMatch?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">Du skal være fyldt 18 år for at oprette en profil.</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvordan markerer jeg min bolig som udlejet?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Log ind, gå til dine opslag og deaktivér opslaget, når boligen er udlejet. Så undgår du flere
						henvendelser, og de boligsøgende spilder ikke tiden på en bolig, der er væk.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvordan sletter jeg min profil?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Du kan til enhver tid slette din profil under Indstillinger. Din profil, dine opslag og dine beskeder
						slettes permanent fra vores systemer senest 30 dage efter. Læs mere i vores
						<a href="/privatlivspolitik" class="text-primary font-medium hover:underline">privatlivspolitik</a>.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Kontakt mellem brugere</h2>
			<div class="divide-y divide-border border-t border-b border-border">
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvordan kontakter jeg en udlejer eller boligsøgende?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Du skal være logget ind for at kontakte andre brugere. Det er et bevidst valg: Når ingen kan skrive
						anonymt, beskytter det både udlejere og boligsøgende mod spam og svindelforsøg. Når du er logget ind,
						kan du sende en besked direkte fra opslaget.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvem kan se mine oplysninger?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Indholdet af dit opslag — fx by, billeder, beskrivelse og dit fornavn — er synligt for besøgende på
						platformen. Dine kontaktoplysninger deles først, når du selv vælger at dele dem i en besked. Din e-mail
						og adgangskode er aldrig synlige for andre.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Tryghed og sikkerhed</h2>
			<div class="divide-y divide-border border-t border-b border-border">
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvordan undgår jeg svindel?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed mb-3">De vigtigste tommelfingerregler:</p>
					<ul class="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed mb-3">
						<li>Betal aldrig depositum eller leje, før du har set boligen fysisk og har en underskrevet lejekontrakt.</li>
						<li>Vær skeptisk over for boliger, der virker urealistisk billige, eller udlejere, der "er i udlandet" og ikke kan fremvise.</li>
						<li>Overfør aldrig penge via anonyme betalingstjenester eller til udenlandske konti.</li>
						<li>Tjek at udlejeren reelt har ret til at udleje boligen — bed evt. om dokumentation.</li>
					</ul>
					<p class="text-sm text-muted-foreground leading-relaxed">
						LejeMatch er en formidlingsplatform og er ikke part i lejeaftaler. Vi verificerer ikke opslag, så brug
						altid din sunde fornuft.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Jeg har set et mistænkeligt opslag — hvad gør jeg?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Brug "Rapportér opslag"-knappen på opslaget. Så bliver det gennemgået, og vi fjerner opslag og lukker
						profiler, der bryder vores
						<a href="/brugervilkaar" class="text-primary font-medium hover:underline">brugervilkår</a>. Du kan også
						altid skrive til
						<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
					</p>
				</div>
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvilke regler gælder for opslag?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Opslag skal være retvisende: Billeder og beskrivelse skal svare til den faktiske bolig, og du må kun
						annoncere boliger, du har ret til at udleje. Svindel, falske opslag og diskriminerende indhold er
						forbudt og fører til, at opslaget fjernes og profilen kan blive lukket. Se alle regler i vores
						<a href="/brugervilkaar" class="text-primary font-medium hover:underline">brugervilkår</a>.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Data og privatliv</h2>
			<div class="divide-y divide-border border-t border-b border-border">
				<div class="py-6">
					<h3 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">Hvad gemmer I om mig?</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						Kun det, der er nødvendigt for at drive tjenesten: dine profiloplysninger, dine opslag og dine
						beskeder. Vi bruger ingen tracking- eller marketingcookies — kun én teknisk cookie, der holder dig
						logget ind. Vi sælger aldrig dine oplysninger. Læs det hele i vores
						<a href="/privatlivspolitik" class="text-primary font-medium hover:underline">privatlivspolitik</a>.
					</p>
				</div>
			</div>
		</section>
	</div>

	<p class="text-sm text-muted-foreground mt-10">
		Fandt du ikke svar på dit spørgsmål? Skriv til os på
		<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
	</p>
</div>
