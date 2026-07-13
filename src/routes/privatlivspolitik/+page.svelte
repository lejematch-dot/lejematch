<script lang="ts">
	import { CVR_NUMBER, COMPANY_ADDRESS, HOSTING_LOCATION, LAST_UPDATED } from '$lib/legal';
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Juridisk</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">Privatlivspolitik</h1>
	<p class="text-sm text-muted-foreground mb-10">Senest opdateret: {LAST_UPDATED}</p>

	<div class="space-y-8 text-muted-foreground leading-relaxed">
		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">1. Dataansvarlig</h2>
			<p>
				LejeMatch{#if CVR_NUMBER}<br />CVR-nr.: {CVR_NUMBER}{/if}<br />
				{COMPANY_ADDRESS}<br />
				E-mail: <a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>
			</p>
			<p class="mt-2">LejeMatch er dataansvarlig for behandlingen af de personoplysninger, der beskrives i denne politik.</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">2. Hvilke oplysninger vi indsamler</h2>
			<p class="mb-2">
				<strong class="text-foreground">Ved oprettelse af profil:</strong> fornavn, efternavn, e-mailadresse, telefonnummer,
				by samt adgangskode (opbevares kun i krypteret/hashet form — vi kan ikke se din adgangskode).
			</p>
			<p class="mb-2"><strong class="text-foreground">Valgfrit i Indstillinger:</strong> alder og profilbillede.</p>
			<p class="mb-2">
				<strong class="text-foreground">Ved oprettelse af opslag:</strong> titel, beskrivelse, pris/budget, by, postnummer,
				område, boligtype, billeder samt boligdetaljer (fx størrelse, depositum, lejeperiode og møblering).
			</p>
			<p class="mb-2">
				<strong class="text-foreground">Ved kontakt til andre brugere:</strong> beskedens indhold og eventuelt telefonnummer.
				Beskeder kan kun sendes af brugere, der er logget ind.
			</p>
			<p><strong class="text-foreground">Teknisk:</strong> en session-cookie, der holder dig logget ind (se afsnit 7).</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">3. Formål og retsgrundlag</h2>
			<p class="mb-2">Vi behandler dine oplysninger til følgende formål:</p>
			<ul class="list-disc pl-5 space-y-2">
				<li>
					<strong class="text-foreground">Levering af tjenesten</strong> — oprettelse og drift af din profil, visning af
					opslag og formidling af kontakt mellem brugere. Retsgrundlag: opfyldelse af aftalen med dig
					(databeskyttelsesforordningens artikel 6, stk. 1, litra b).
				</li>
				<li>
					<strong class="text-foreground">Drift, sikkerhed og moderation</strong> — forebyggelse af svindel og misbrug,
					håndtering af anmeldte opslag og teknisk fejlfinding. Retsgrundlag: vores legitime interesse i at drive en
					sikker og troværdig platform (artikel 6, stk. 1, litra f).
				</li>
				<li>
					<strong class="text-foreground">Overholdelse af lovkrav</strong> — fx opbevaring af regnskabsmateriale.
					Retsgrundlag: retlig forpligtelse (artikel 6, stk. 1, litra c).
				</li>
			</ul>
			<p class="mt-2">Vi bruger ikke dine oplysninger til markedsføring over for tredjeparter og sælger aldrig dine oplysninger.</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">4. Databehandlere og modtagere</h2>
			<p class="mb-2">Vi bruger følgende leverandører, der behandler oplysninger på vores vegne:</p>
			<ul class="list-disc pl-5 space-y-2">
				<li>
					<strong class="text-foreground">Hetzner Online GmbH</strong> — hosting af platform og database. Serverne er
					placeret i EU ({HOSTING_LOCATION}).
				</li>
				<li>
					<strong class="text-foreground">Mailgun (EU-region)</strong> — udsendelse af systemmails, fx bekræftelses- og
					notifikationsmails. Oplysningerne behandles i Mailguns EU-region.
				</li>
			</ul>
			<p class="mt-2">
				Der er indgået databehandleraftaler med vores leverandører. Vi overfører som udgangspunkt ikke oplysninger til
				lande uden for EU/EØS. Sker det undtagelsesvist, sikres overførslen med et gyldigt overførselsgrundlag, fx
				EU-Kommissionens standardkontraktbestemmelser.
			</p>
			<p class="mt-2">
				Oplysninger, du selv offentliggør i et opslag (fx bynavn, boligbilleder og dit fornavn), er synlige for andre
				besøgende på platformen.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">5. Opbevaring og sletning</h2>
			<ul class="list-disc pl-5 space-y-2">
				<li>Dine oplysninger opbevares, så længe du har en profil hos os.</li>
				<li>
					Du kan til enhver tid slette din profil under "Indstillinger". Ved sletning fjernes din profil, dine opslag
					og dine beskeder permanent fra vores systemer senest 30 dage efter.
				</li>
				<li>Oplysninger, vi er forpligtet til at opbevare efter bogføringsloven, gemmes i op til 5 år efter udgangen af det relevante regnskabsår.</li>
			</ul>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">6. Dine rettigheder</h2>
			<p class="mb-2">Efter databeskyttelsesforordningen har du ret til:</p>
			<ul class="list-disc pl-5 space-y-1">
				<li><strong class="text-foreground">Indsigt</strong> i de oplysninger, vi behandler om dig</li>
				<li><strong class="text-foreground">Berigtigelse</strong> af forkerte oplysninger</li>
				<li><strong class="text-foreground">Sletning</strong> af dine oplysninger</li>
				<li><strong class="text-foreground">Begrænsning</strong> af behandlingen</li>
				<li><strong class="text-foreground">Dataportabilitet</strong> — at få udleveret dine oplysninger i et almindeligt anvendt format</li>
				<li><strong class="text-foreground">Indsigelse</strong> mod behandling, der sker på grundlag af vores legitime interesse</li>
			</ul>
			<p class="mt-2">
				Du udøver dine rettigheder ved at kontakte os på
				<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
				Vi svarer hurtigst muligt og senest inden for en måned.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">7. Cookies</h2>
			<p>
				LejeMatch.dk anvender kun én cookie: en teknisk nødvendig session-cookie, der holder dig logget ind. Vi bruger
				ingen cookies til statistik, tracking eller markedsføring. Da teknisk nødvendige cookies ikke kræver samtykke,
				viser vi ikke et cookie-banner. Hvis vi på et tidspunkt indfører cookies, der kræver samtykke, vil du blive bedt
				om samtykke, før de sættes.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">8. Klage</h2>
			<p class="mb-2">
				Hvis du er utilfreds med vores behandling af dine personoplysninger, hører vi gerne fra dig først på
				<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
				Du har desuden altid ret til at klage til:
			</p>
			<p>
				Datatilsynet<br />
				Carl Jacobsens Vej 35, 2500 Valby<br />
				Tlf. 33 19 32 00<br />
				<a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">www.datatilsynet.dk</a>
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">9. Ændringer af denne politik</h2>
			<p>
				Vi opdaterer denne politik ved behov, fx hvis vi skifter leverandører eller indfører nye funktioner. Væsentlige
				ændringer varsles på platformen. Datoen øverst viser, hvornår politikken senest er ændret.
			</p>
		</section>
	</div>
</div>
