<script lang="ts">
	import { getObjectPosition } from '$lib/imagePosition';
	import { relationshipTypeLabels, employmentSummary, agesSummary } from '$lib/types/contact';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let expandedIds = $state(new Set<number>());
	function toggleExpanded(id: number) {
		const next = new Set(expandedIds);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		expandedIds = next;
	}
</script>

<svelte:head>
	<title>Beskeder – LejeMatch</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Beskeder</h1>
	</div>

	{#if data.contacts.length === 0}
		<div class="border border-border p-12 text-center">
			<svg class="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
				/>
			</svg>
			<p class="text-sm text-muted-foreground">Du har ingen beskeder endnu.</p>
		</div>
	{:else}
		<div class="border border-border gap-px bg-border flex flex-col">
			{#each data.contacts as { contact, senderProfile, targetTitle, targetUrl } (contact.ID)}
				{@const isExpanded = expandedIds.has(contact.ID)}
				{@const isLong = contact.Message.length > 280}
				<div class="bg-background px-5 py-4">
					<div class="flex items-start justify-between gap-4 mb-2">
						<a
							href="/profil/{contact.SenderID}"
							class="flex items-center gap-3 hover:opacity-80 transition-opacity"
						>
							{#if senderProfile?.imageURL}
								<img
									src={senderProfile.imageURL}
									alt=""
									class="w-10 h-10 object-cover"
									style="object-position: {getObjectPosition(senderProfile.imageURL)}"
								/>
							{:else}
								<div class="w-10 h-10 bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
									{senderProfile?.displayName?.[0]?.toUpperCase() ?? '?'}
								</div>
							{/if}
							<div>
								<p class="font-bold text-foreground text-sm uppercase tracking-wide">
									{senderProfile?.displayName ?? 'Ukendt bruger'}
								</p>
								<p class="text-xs text-muted-foreground">Se profil</p>
							</div>
						</a>
						<span class="text-xs text-muted-foreground shrink-0">
							{new Date(contact.CreatedAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })}
						</span>
					</div>

					{#if contact.TargetType === 'listing'}
						<div class="flex flex-wrap gap-1.5 mb-2">
							<span class="text-[11px] px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wide">
								{contact.NumPeople >= 5 ? '5+' : contact.NumPeople}
								{contact.NumPeople === 1 ? 'person' : 'personer'}{relationshipTypeLabels[contact.RelationshipType]
									? ` · ${relationshipTypeLabels[contact.RelationshipType]}`
									: ''}
							</span>
							{#if contact.Ages?.length}
								<span class="text-[11px] px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wide">
									Alder: {agesSummary(contact.Ages)}
								</span>
							{/if}
							{#if contact.Employment}
								<span class="text-[11px] px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wide">
									{employmentSummary(contact.Employment, contact.EmploymentOther)}
								</span>
							{/if}
							<span class="text-[11px] px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wide">
								Kæledyr: {contact.HasPets ? 'Ja' : 'Nej'}
							</span>
						</div>
					{/if}

					<p
						class="text-sm text-muted-foreground whitespace-pre-wrap mb-1 {!isExpanded && isLong
							? 'line-clamp-5'
							: ''}"
					>
						{contact.Message}
					</p>
					{#if isLong}
						<div class="flex justify-end mb-2">
							<button
								type="button"
								onclick={() => toggleExpanded(contact.ID)}
								class="text-sm text-primary font-medium hover:underline"
							>
								{isExpanded ? 'Se mindre' : 'Se mere...'}
							</button>
						</div>
					{/if}

					{#if contact.SenderPhone}
						<p class="text-xs text-muted-foreground mb-2">Telefon: {contact.SenderPhone}</p>
					{/if}

					{#if targetTitle}
						<a href={targetUrl} class="text-xs text-primary font-medium hover:underline">
							Om opslaget: {targetTitle}
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
