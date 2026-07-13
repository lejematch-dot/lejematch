<script lang="ts">
	import { CVR_NUMBER, COMPANY_ADDRESS, LAST_UPDATED } from '$lib/legal';
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Juridisk</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase tracking-tight">Brugervilkår</h1>
	<p class="text-sm text-muted-foreground mb-10">Senest opdateret: {LAST_UPDATED}</p>

	<div class="space-y-8 text-muted-foreground leading-relaxed">
		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">1. Om LejeMatch</h2>
			<p class="mb-2">LejeMatch.dk drives af:</p>
			<p class="mb-2">
				LejeMatch{#if CVR_NUMBER}<br />CVR-nr.: {CVR_NUMBER}{/if}<br />
				{COMPANY_ADDRESS}<br />
				E-mail: <a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>
			</p>
			<p>Ved at oprette en profil eller bruge LejeMatch.dk accepterer du disse vilkår.</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">2. Hvad LejeMatch er — og ikke er</h2>
			<p class="mb-2">
				LejeMatch er en formidlingsplatform, der skaber kontakt mellem udlejere og boligsøgende. LejeMatch er
				<strong class="text-foreground">ikke</strong> part i de lejeaftaler, der indgås mellem brugere, og er hverken
				udlejer, mægler eller rådgiver.
			</p>
			<p class="mb-2">
				LejeMatch verificerer ikke rigtigheden af opslag, boliger eller brugeres identitet og indestår ikke for, at
				oplysninger i opslag er korrekte. Al kontakt, fremvisning, aftaleindgåelse og betaling sker direkte mellem
				brugerne og på eget ansvar.
			</p>
			<p>Vi opfordrer altid til: Betal aldrig depositum eller leje, før du har set boligen og har en underskrevet lejekontrakt.</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">3. Oprettelse af profil</h2>
			<ul class="list-disc pl-5 space-y-1">
				<li>Du skal være fyldt 18 år for at oprette en profil.</li>
				<li>Du skal oplyse korrekte oplysninger og holde dem opdaterede.</li>
				<li>Din profil er personlig. Du er ansvarlig for at holde din adgangskode hemmelig og for al aktivitet, der sker via din profil.</li>
				<li>Du må kun oprette én profil.</li>
			</ul>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">4. Regler for opslag og adfærd</h2>
			<p class="mb-2">Når du bruger LejeMatch, må du ikke:</p>
			<ul class="list-disc pl-5 space-y-1">
				<li>Oprette falske, vildledende eller svigagtige opslag.</li>
				<li>Udleje eller annoncere en bolig, du ikke har ret til at udleje.</li>
				<li>Bruge billeder eller beskrivelser, der ikke er retvisende for den faktiske bolig.</li>
				<li>Diskriminere på baggrund af køn, etnicitet, religion, seksuel orientering, handicap eller lignende forhold.</li>
				<li>Opkræve betaling for at fremvise en bolig eller kræve betaling, før en lejeaftale er indgået.</li>
				<li>Sende spam, chikanere andre brugere eller bruge platformen til andre formål end boligformidling.</li>
				<li>Uploade indhold, der krænker andres rettigheder eller er i strid med lovgivningen.</li>
			</ul>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">5. Rettigheder til indhold</h2>
			<p>
				Du beholder rettighederne til det indhold (tekst og billeder), du uploader. Ved at oprette et opslag giver du
				LejeMatch ret til at vise og behandle indholdet på platformen som led i tjenestens drift. Du indestår for, at
				du har ret til at bruge det indhold, du uploader.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">6. Moderation</h2>
			<p>
				LejeMatch forbeholder sig ret til uden forudgående varsel at fjerne opslag, afvise indhold og suspendere eller
				lukke profiler ved overtrædelse af disse vilkår eller ved mistanke om svindel eller misbrug. Brugere kan
				anmelde opslag via platformens rapporteringsfunktion.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">7. Pris</h2>
			<p>
				LejeMatch er gratis at bruge og finansieres af annoncer. Hvis der senere indføres betalte funktioner, vil det
				blive varslet tydeligt på platformen, og eksisterende gratis funktioner ændres ikke uden varsel.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">8. Ansvarsfraskrivelse</h2>
			<p class="mb-2">LejeMatch kan ikke gøres ansvarlig for:</p>
			<ul class="list-disc pl-5 space-y-1">
				<li>Indholdet af brugeres opslag eller rigtigheden heraf.</li>
				<li>Tab, tvister eller skader, der opstår i forbindelse med kontakt eller aftaler mellem brugere, herunder økonomiske tab ved svindel.</li>
				<li>Midlertidig nedetid, fejl eller datatab på platformen.</li>
			</ul>
			<p class="mt-2">
				Platformen leveres, som den er og forefindes. Intet i disse vilkår begrænser dog ansvar, der ikke gyldigt kan
				fraskrives efter dansk ret.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">9. Personoplysninger</h2>
			<p>
				Vores behandling af personoplysninger er beskrevet i
				<a href="/privatlivspolitik" class="text-primary font-medium hover:underline">privatlivspolitikken</a>.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">10. Ændringer af vilkårene</h2>
			<p>
				Vi kan opdatere disse vilkår. Væsentlige ændringer varsles på platformen eller pr. e-mail. Fortsat brug af
				LejeMatch efter en ændring udgør accept af de nye vilkår.
			</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">11. Lovvalg og tvister</h2>
			<p>Disse vilkår er underlagt dansk ret. Tvister afgøres ved de danske domstole.</p>
		</section>

		<section>
			<h2 class="font-bold text-foreground text-sm uppercase tracking-wide mb-2">12. Kontakt</h2>
			<p>
				Spørgsmål til vilkårene kan rettes til
				<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>.
			</p>
		</section>
	</div>
</div>
