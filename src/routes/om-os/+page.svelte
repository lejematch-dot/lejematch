<script lang="ts">
	import { CVR_NUMBER } from '$lib/legal';
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">Om os</h1>

	<div class="space-y-8">
		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvorfor findes LejeMatch?</h2>
			<div class="space-y-3 text-sm text-muted-foreground leading-relaxed">
				<p>
					Hej, jeg hedder Adam. Jeg studerer medicin i Aarhus, og LejeMatch startede med min og min kærestes
					egen boligjagt.
				</p>
				<p>
					Da vi skulle finde et sted at bo i København, oplevede vi selv, hvor svært det er at finde en
					lejebolig: endeløse Facebook-grupper fyldt med rod, dubletter og tvivlsomme opslag — og
					boligportaler, der tager flere hundrede kroner om måneden, bare for at man må skrive til en udlejer.
					Mange af vores venner har stået i præcis samme situation.
				</p>
				<p>
					Det burde ikke være så besværligt — at finde et sted at bo er stressende nok i forvejen. Derfor
					byggede jeg LejeMatch: en platform, hvor udlejere og boligsøgende finder hinanden direkte, gratis,
					overskueligt og uden mellemled.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvad gør LejeMatch anderledes?</h2>
			<ul class="space-y-3 text-sm text-muted-foreground leading-relaxed">
				<li>
					<strong class="text-foreground">Gratis for alle.</strong> Det koster ikke noget at oprette opslag, søge
					eller kontakte andre brugere. Hverken for udlejere eller boligsøgende.
				</li>
				<li>
					<strong class="text-foreground">Begge veje.</strong> Udlejere kan slå boliger op — men boligsøgende kan
					også oprette deres eget opslag, som udlejere kan reagere på. Så behøver du ikke sidde og opdatere
					søgesider hele dagen.
				</li>
				<li>
					<strong class="text-foreground">Direkte kontakt.</strong> Ingen betalingsmur mellem dig og udlejeren. I
					skriver direkte sammen og aftaler selv resten.
				</li>
				<li>
					<strong class="text-foreground">Tryghed først.</strong> Man skal være logget ind for at kontakte andre —
					det holder spam og svindlere ude. Alle opslag kan rapporteres, og vi fjerner indhold, der bryder
					<a href="/brugervilkaar" class="text-primary font-medium hover:underline">reglerne</a>.
				</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Hvem står bag?</h2>
			<div class="space-y-3 text-sm text-muted-foreground leading-relaxed">
				<p>
					LejeMatch er en ung, dansk platform — bygget af mig, med god hjælp fra en kammerat på den tekniske
					side undervejs. Der er ingen stor virksomhed bag, ingen investorer og ingen skjulte gebyrer. Bare en
					studerende, der synes, boligjagt skal være gratis og ordentlig.
				</p>
				<p>
					Det betyder også, at platformen stadig udvikler sig. Har du forslag, ris eller ros, vil jeg rigtig
					gerne høre fra dig — jeg læser og svarer selv på alle henvendelser.
				</p>
				<p>
					Kontakt:
					<a href="mailto:kontakt@lejematch.dk" class="text-primary font-medium hover:underline">kontakt@lejematch.dk</a>
				</p>
			</div>
		</section>
	</div>

	<p class="text-xs text-muted-foreground mt-10">LejeMatch{#if CVR_NUMBER}{' '}· CVR-nr. {CVR_NUMBER}{/if}</p>

	<div class="mt-14 pt-8 border-t border-border">
		<a
			href="/register"
			class="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
		>
			Opret profil
		</a>
	</div>
</div>
