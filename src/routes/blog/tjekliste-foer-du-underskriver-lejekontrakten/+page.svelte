<script lang="ts">
	import { blogPosts } from '$lib/blog';

	const post = blogPosts.find((p) => p.slug === 'tjekliste-foer-du-underskriver-lejekontrakten')!;

	const checklist = [
		'Har du læst hele kontrakten — også § 11?',
		'Stemmer husleje, depositum og forudbetalt leje overens med det, I har aftalt mundtligt?',
		'Er der lavet, eller aftalt, en indflytningsrapport?',
		'Ved du, hvem der har ansvaret for vedligeholdelse?',
		'Har du fået tid til at læse kontrakten i ro, uden pres?',
		'Har du et eget eksemplar af den underskrevne kontrakt liggende?'
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
		Tjekliste før du underskriver lejekontrakten
	</h1>

	<div class="space-y-8 text-muted-foreground leading-relaxed">
		<div class="space-y-4 text-sm">
			<p>
				Du har endelig fundet en bolig, du gerne vil have. Du er lettet, måske lidt euforisk — og så ligger
				kontrakten der, klar til underskrift. Det er præcis her, mange lejere skynder sig for meget. En
				lejekontrakt er bindende fra det øjeblik, du skriver under, og de fleste konflikter mellem lejer og
				udlejer opstår, fordi noget ikke stod klart nok beskrevet fra starten.
			</p>
			<p>
				Denne tjekliste går igennem, hvad du skal kigge efter i en lejekontrakt, før du sætter din underskrift —
				så du undgår ubehagelige overraskelser senere.
			</p>
		</div>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvilken type kontrakt har du med at gøre?</h2>
			<div class="space-y-3 text-sm">
				<p>
					De fleste private udlejere bruger <strong class="text-foreground">typeformular A9</strong>, som er
					den lovpligtige standardkontrakt til private lejemål. Fordelen ved A9 er, at den følger lejelovens
					struktur, så det er lettere at gennemskue, hvad der er standardvilkår, og hvad udlejer selv har
					tilføjet.
				</p>
				<p>
					Støder du på en hjemmelavet kontrakt, er det ikke nødvendigvis et problem — men det kræver, at du
					læser endnu grundigere efter, da der ikke er den samme faste ramme at holde den op imod. Er du i
					tvivl, kan du altid spørge udlejer, hvorfor der ikke bruges en typeformular — der kan være en helt
					fin forklaring, men det er et rimeligt spørgsmål at stille.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">De vigtigste punkter at tjekke i selve kontrakten</h2>
			<p class="text-sm mb-3">
				Læs kontrakten fra ende til anden, gerne i ro og mag og ikke stående i entréen lige efter en
				fremvisning. Det er lettere at fange uklarheder, når du ikke samtidig skal tage stilling til, om du
				overhovedet vil have boligen.
			</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm">
				<li>
					<strong class="text-foreground">Udlejers navn og kontaktoplysninger.</strong> Stemmer det overens med
					den person, du har været i dialog med, og gerne med den tinglyste ejer?
				</li>
				<li>
					<strong class="text-foreground">Boligens adresse og areal.</strong> Tjek at oplysningerne matcher det,
					du har set og det, der står i BBR.
				</li>
				<li>
					<strong class="text-foreground">Lejeperiodens start — og om lejemålet er tidsbegrænset.</strong> Er
					lejemålet tidsbegrænset, skal det fremgå tydeligt og med en gyldig begrundelse. Er det ikke anført
					korrekt, kan det få betydning for, hvor let udlejer kan bringe lejemålet til ophør.
				</li>
				<li>
					<strong class="text-foreground">§ 11 — særlige vilkår.</strong> Det er her, aftaler om for eksempel
					huslejestigninger eller tidsbegrænsning skal stå. Læs afsnittet grundigt — det er ofte her, det
					virkelig vigtige gemmer sig.
				</li>
				<li>
					<strong class="text-foreground">Husleje, depositum og forudbetalt leje.</strong> Tjek at beløbene er
					tydeligt angivet, og at de holder sig inden for lejelovens grænser (mere om det nedenfor).
				</li>
				<li>
					<strong class="text-foreground">Vedligeholdelsesfordeling.</strong> Hvem har ansvaret for indvendig og
					udvendig vedligeholdelse? Dette punkt giver ofte anledning til uenighed ved fraflytning, så det er
					værd at forstå fra starten.
				</li>
				<li>
					<strong class="text-foreground">Opsigelsesvarsler.</strong> Hvor lang tid i forvejen skal du opsige
					lejemålet, og gælder der særlige regler, hvis lejemålet er tidsbegrænset?
				</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Indflytningsrapport — din sikkerhed ved fraflytning</h2>
			<div class="space-y-3 text-sm">
				<p>
					Udlejere, der udlejer mere end én bolig, er som udgangspunkt forpligtet til at udarbejde en
					indflytningsrapport, når du flytter ind. Rapporten beskriver boligens stand ved indflytning —
					herunder eventuelle skader eller mangler, der allerede findes.
				</p>
				<p>
					Deltag i synet, hvis du kan, og sørg for, at alt det, du selv observerer af skader eller slid, bliver
					skrevet ind i rapporten. Gør du det ikke, risikerer du senere at blive gjort ansvarlig for noget, du
					ikke selv har forårsaget. Er der ikke lavet en indflytningsrapport, så spørg ind til det — det er en
					rettighed, du har som lejer.
				</p>
				<p>
					Tag også selv nogle billeder af boligens stand, den dag du flytter ind. Det koster to minutter og
					kan spare dig for en diskussion, den dag du flytter ud igen.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Opsigelse og bindingsperiode — hvad betyder det for dig?</h2>
			<p class="text-sm">
				Som lejer kan du som udgangspunkt opsige et almindeligt lejemål med tre måneders varsel, medmindre
				kontrakten er tidsbegrænset. Er lejemålet tidsbegrænset og korrekt begrundet i § 11, kan du normalt ikke
				opsige det før tid — så tænk dig om, hvis du er i tvivl om, hvor længe du reelt ønsker at blive boende.
				Er du student og kun skal bo et sted i et år, kan en tidsbegrænset kontrakt være helt fin, men det er
				værd at kende konsekvensen, før du skriver under.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvis I bliver uenige senere</h2>
			<p class="text-sm">
				Det er ikke sikkert, det bliver relevant, men det er rart at vide: Kan du og udlejer ikke blive enige —
				for eksempel om, hvor meget der skal trækkes fra depositummet ved fraflytning — kan sagen bringes for
				det lokale huslejenævn. Det er en gratis eller billig instans, der er oprettet netop til at afgøre den
				slags tvister mellem lejer og udlejer.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Røde flag i en lejekontrakt</h2>
			<p class="text-sm mb-3">
				Ikke alle problematiske kontrakter er svindel — nogle er bare skrevet, så de tilgodeser udlejer mere,
				end loven egentlig lægger op til. Vær opmærksom på:
			</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm">
				<li>Depositum eller forudbetalt leje, der overstiger lejelovens grænser.</li>
				<li>Et tidsbegrænset lejemål uden nogen begrundelse i § 11.</li>
				<li>Uklare eller meget ensidige regler om vedligeholdelse, hvor alt ansvar lægges over på dig som lejer.</li>
				<li>Ingen tilbud om indflytningsrapport eller syn af boligen.</li>
				<li>Mundtlige løfter ("det skriver vi bare ikke ind, du kan stole på mig"), der ikke fremgår af kontrakten. Hvis det ikke står skrevet, gælder det ikke.</li>
				<li>Pres for at skrive under samme dag, uden tid til at læse kontrakten igennem i ro.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Praktisk tjekliste, lige før du skriver under</h2>
			<ul class="space-y-2 text-sm mb-3">
				{#each checklist as item (item)}
					<li class="flex items-start gap-2">
						<span class="mt-0.5 w-4 h-4 border border-border shrink-0"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<p class="text-sm">
				Er du i tvivl om noget som helst, er det bedre at spørge én gang for meget end at opdage et problem,
				når det er for sent at rette.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Opdager du et problem, efter du har skrevet under?</h2>
			<p class="text-sm">
				Det sker. Måske opdager du først bagefter, at et punkt var uklart, eller at noget ikke stemmer med det,
				I havde aftalt mundtligt. Kontakt i så fald udlejer skriftligt med det samme, så I har en fælles
				forståelse på skrift. Kan I ikke blive enige, kan du søge rådgivning hos for eksempel Lejernes
				Landsorganisation eller en anden lejerretshjælp — de fleste tilbyder gratis eller billig rådgivning til
				medlemmer.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Kort om depositum og forudbetalt leje</h2>
			<p class="text-sm italic mb-3">Dette afsnit er vejledende og skal ikke betragtes som juridisk rådgivning.</p>
			<p class="text-sm mb-3">Lejeloven sætter en klar grænse for, hvad en udlejer må kræve ved indflytning:</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li><strong class="text-foreground">Depositum</strong> må højst svare til <strong class="text-foreground">3 måneders husleje</strong>.</li>
				<li><strong class="text-foreground">Forudbetalt leje</strong> må også højst udgøre <strong class="text-foreground">3 måneders husleje</strong>.</li>
				<li>Tilsammen må depositum og forudbetalt leje højst svare til <strong class="text-foreground">6 måneders husleje</strong> — og herudover kan udlejer opkræve den første måneds husleje.</li>
			</ul>
			<p class="text-sm">Kræves der markant mere end dette, bør du spørge ind til hvorfor, før du betaler noget som helst.</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Til sidst</h2>
			<div class="space-y-3 text-sm">
				<p>
					En lejekontrakt behøver ikke være kompliceret at forstå — men den fortjener, at du læser den
					ordentligt igennem, før du skriver under. Tag dig den tid, det kræver. En seriøs udlejer har intet
					imod, at du læser kontrakten grundigt eller stiller spørgsmål til den.
				</p>
				<p>
					På LejeMatch skal du være logget ind for at kontakte andre brugere, og vi opfordrer altid til, at
					aftaler skrives ned i en ordentlig kontrakt — det beskytter både dig og udlejeren.
				</p>
			</div>
		</section>
	</div>

	<div class="mt-14 pt-8 border-t border-border">
		<a
			href="/listings"
			class="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
		>
			Find en bolig
		</a>
	</div>
</div>
