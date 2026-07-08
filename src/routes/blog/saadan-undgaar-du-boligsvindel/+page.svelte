<script lang="ts">
	import { blogPosts } from '$lib/blog';

	const post = blogPosts.find((p) => p.slug === 'saadan-undgaar-du-boligsvindel')!;
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
		Sådan undgår du boligsvindel — den komplette guide til lejere
	</h1>

	<div class="space-y-8 text-muted-foreground leading-relaxed">
		<div class="space-y-4 text-sm">
			<p>
				Boligmarkedet i de store danske byer er presset. Der er for få boliger til for mange interesserede, og
				det pres udnytter svindlere. Når du står med udsigt til at miste din bolig, eller skal flytte til en ny
				by for at starte på studiet, er det fristende at handle hurtigt — og det ved svindlerne. Derfor rammer
				boligsvindel især studerende og unge, der leder febrilsk efter et sted at bo og ikke altid har
				erfaringen eller overskuddet til at tjekke tingene grundigt efter.
			</p>
			<p>
				Den gode nyhed er, at langt de fleste tilfælde af svindel med lejebolig følger nogle ret genkendelige
				mønstre. Kender du dem, er du allerede godt beskyttet. Denne guide går igennem de mest almindelige
				svindelmetoder, hvilke advarselstegn du skal holde øje med, hvordan du selv kan tjekke en bolig og en
				udlejer, hvad loven siger om depositum og forudbetalt leje, og hvad du gør, hvis du alligevel er blevet
				snydt.
			</p>
		</div>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
				De mest almindelige typer boligsvindel
			</h2>
			<div class="space-y-5 text-sm">
				<div>
					<h3 class="font-semibold text-foreground mb-1">1. Falske opslag med stjålne billeder</h3>
					<p>
						Svindleren kopierer billeder og beskrivelse fra en ægte boligannonce (ofte fra en anden portal
						eller et ejendomsmæglersite) og opretter et nyt opslag på en lav pris. Boligen findes måske slet
						ikke til leje — eller findes slet ikke i den form, annoncen viser.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">2. "Udlejeren er i udlandet"</h3>
					<p>
						Et klassisk trick: Udlejeren skriver, at vedkommende er flyttet til udlandet af arbejde og
						derfor ikke kan vise boligen frem. I stedet skal du overføre depositum og første måneds leje, så
						bliver nøglen sendt med post. Når pengene er sendt, hører du aldrig fra "udlejeren" igen.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">3. Krav om depositum før fremvisning</h3>
					<p>
						Du bliver bedt om at betale depositum eller et "reservationsgebyr" for at sikre dig boligen,
						inden du overhovedet har set den. Dette er et af de tydeligste advarselstegn, der findes —
						depositum før fremvisning bør altid få alarmklokkerne til at ringe.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">4. Betaling via udenlandske konti eller uigenkaldelige tjenester</h3>
					<p>
						Svindlere beder ofte om overførsel til en bankkonto i udlandet, via Western Union, gavekort
						eller kryptovaluta. Fælles for dem alle: Pengene kan ikke spores eller kaldes tilbage, når de
						først er sendt.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">5. Phishing efter MitID og personoplysninger</h3>
					<p>
						Du bliver bedt om at "verificere" dig selv, ofte via et link, der leder til en falsk side, hvor
						du skal logge ind med MitID eller oplyse CPR-nummer og kortoplysninger. Ingen seriøs udlejer har
						brug for dit MitID for at leje en bolig ud til dig.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">6. Dobbeltudlejning eller udlejning uden ret til det</h3>
					<p>
						Nogle svindlere lejer selv en bolig ud og videreudlejer den til flere personer samtidig, uden at
						have ejerens eller udlejerens tilladelse. Flere lejere ender med at have betalt for den samme
						bolig.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">7. Falsk identitet bag opslaget</h3>
					<p>
						Svindleren udgiver sig for en ejendomsmægler, et boligselskab eller en privat udlejer og bruger
						et opdigtet eller stjålet navn. Nogle har endda manipuleret oplysninger, så et telefonnummer ser
						ud til at høre til den pågældende adresse.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-foreground mb-1">8. Pres og hastværk</h3>
					<p>
						Fælles for stort set alle typer boligsvindel er, at du bliver presset til at handle hurtigt: "Der
						er tre andre interesserede", "jeg rejser i morgen", "tilbuddet gælder kun i dag". Presset er
						selve metoden — det skal forhindre dig i at tænke dig om.
					</p>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Røde flag: tjekliste</h2>
			<p class="text-sm mb-3">Gå disse punkter igennem, hver gang du finder en bolig, der virker interessant:</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm">
				<li>Huslejen er markant lavere end lignende boliger i samme område.</li>
				<li>Du bliver bedt om depositum eller betaling, før du har set boligen.</li>
				<li>Udlejeren kan ikke eller vil ikke vise boligen frem fysisk — kun via video eller billeder.</li>
				<li>Udlejeren er "i udlandet" og kan derfor ikke mødes eller vise boligen.</li>
				<li>Du bliver bedt om at overføre penge til en udenlandsk konto, via Western Union, gavekort eller kryptovaluta.</li>
				<li>Der er stort tidspres: du skal beslutte dig og betale med det samme.</li>
				<li>Du bliver bedt om MitID, CPR-nummer eller kopi af pas, før I overhovedet har talt om en kontrakt.</li>
				<li>Annoncens sprog er upræcist, oversat eller genbruges ordret i flere opslag.</li>
				<li>Billederne virker "for perfekte", eller du kan finde dem i andre annoncer et andet sted.</li>
				<li>Der findes ingen skriftlig lejekontrakt, eller udlejeren er ikke interesseret i at lave en ordentlig kontrakt.</li>
			</ul>
			<p class="text-sm mt-3">Jo flere af disse punkter der rammer, jo større grund til at stoppe op.</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
				Sådan tjekker du en udlejer og en bolig
			</h2>
			<div class="space-y-3 text-sm">
				<p>Det tager kun få minutter at lave et grundtjek — og det er tid givet godt ud.</p>
				<p>
					<strong class="text-foreground">Tjek BBR-oplysningerne.</strong> Via boligejer.dk eller borger.dk kan
					du slå adressen op i Bygnings- og Boligregistret (BBR) og se boligens areal, type og andre
					grunddata. Stemmer det ikke overens med annoncen, er det et advarselstegn.
				</p>
				<p>
					<strong class="text-foreground">Tjek den tinglyste ejer.</strong> På tinglysning.dk kan du se, hvem
					der reelt står som ejer af ejendommen. Er navnet et helt andet end personen, du er i dialog med, bør
					du spørge ind til hvorfor — der kan være gode grunde (fx fremleje), men det skal kunne forklares og
					dokumenteres.
				</p>
				<p>
					<strong class="text-foreground">Lav en omvendt billedsøgning.</strong> Upload eller søg på
					boligbillederne via Google Billeder. Dukker de samme billeder op i andre annoncer, andre byer eller
					endda på udenlandske sider, er det stærkt tegn på et falsk opslag.
				</p>
				<p>
					<strong class="text-foreground">Bed om dokumentation.</strong> Bed udlejeren om at vise ID og
					eventuelt ejendomsdokumenter, dokumentation for at have ret til at leje boligen ud. En seriøs
					udlejer har normalt ingen problemer med det.
				</p>
				<p>
					<strong class="text-foreground">Se boligen fysisk, hvis muligt.</strong> Der findes ingen genvej: Den
					bedste beskyttelse mod boligsvindel er at se boligen med dine egne øjne, før du betaler noget som
					helst.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
				Hvad siger loven om depositum og forudbetalt leje
			</h2>
			<p class="text-sm italic mb-3">Dette afsnit er vejledende og skal ikke betragtes som juridisk rådgivning.</p>
			<p class="text-sm mb-3">
				Lejeloven sætter klare grænser for, hvor meget en udlejer må kræve af dig, når du flytter ind:
			</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li><strong class="text-foreground">Depositum</strong> må maksimalt svare til <strong class="text-foreground">3 måneders husleje</strong>.</li>
				<li><strong class="text-foreground">Forudbetalt leje</strong> må også maksimalt udgøre <strong class="text-foreground">3 måneders husleje</strong>.</li>
				<li>Depositum og forudbetalt leje må tilsammen højst svare til <strong class="text-foreground">6 måneders husleje</strong>.</li>
				<li>Derudover kan udlejer kræve den første måneds husleje betalt ved indflytning.</li>
			</ul>
			<p class="text-sm mb-3">
				Kræver en udlejer markant mere end dette — eller beder om hele beløbet overført, før du overhovedet har
				set boligen eller skrevet under på en kontrakt — er det et solidt tegn på, at noget er galt.
			</p>
			<p class="text-sm">
				Sørg desuden altid for en skriftlig lejekontrakt. Den beskytter både dig og udlejeren, og uden den står
				du meget svagt, hvis noget senere skulle gå galt.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvis skaden er sket</h2>
			<p class="text-sm mb-3">Er du blevet snydt, eller mistænker du, at du er ved at blive det, skal du handle hurtigt:</p>
			<ul class="list-disc pl-5 space-y-1.5 text-sm mb-3">
				<li>
					<strong class="text-foreground">Anmeld til politiet.</strong> Det kan gøres online på politi.dk. Jo
					før du anmelder, jo bedre chance for at sagen kan følges op, og jo flere andre kan advares.
				</li>
				<li>
					<strong class="text-foreground">Kontakt din bank med det samme.</strong> Har du overført penge, så
					ring til banken og forklar situationen. Nogle overførsler kan i sjældne tilfælde stoppes eller
					tilbageføres, hvis banken handler hurtigt.
				</li>
				<li>
					<strong class="text-foreground">Anmeld selve opslaget.</strong> Uanset hvilken platform annoncen lå
					på, bør du anmelde den, så den bliver fjernet, og andre ikke falder i samme fælde.
				</li>
				<li>
					<strong class="text-foreground">Skift eventuelt dine adgangskoder</strong> og overvej en kreditadvarsel
					via borger.dk, hvis du har delt MitID- eller CPR-oplysninger.
				</li>
			</ul>
			<p class="text-sm">
				Det kan føles ubehageligt at skulle indrømme, at man er blevet snydt — men jo hurtigere du reagerer, jo
				bedre er dine chancer for at begrænse skaden.
			</p>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Til sidst</h2>
			<div class="space-y-3 text-sm">
				<p>
					Den vigtigste huskeregel i hele denne guide er egentlig ganske enkel: Betal aldrig noget, før du har
					set boligen og skrevet under på en kontrakt. Ikke depositum, ikke forudbetalt leje, ikke et
					"reservationsgebyr". Uanset hvor godt tilbuddet lyder, eller hvor stort presset føles, er det den
					ene regel, der beskytter dig mod langt de fleste former for boligsvindel.
				</p>
				<p>
					På LejeMatch skal du være logget ind for at kontakte andre brugere, og alle opslag kan rapporteres
					direkte, hvis noget virker forkert. Men den bedste beskyttelse er stadig din egen sunde skepsis —
					brug den, hver gang noget virker for godt til at være sandt.
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
