<script lang="ts">
	import type { ContactReply } from '$lib/types/contact';

	let { contactId, myUserId }: { contactId: number; myUserId: number } = $props();

	let replies = $state<ContactReply[]>([]);
	let loading = $state(true);
	let loadError = $state(false);
	let draft = $state('');
	let sending = $state(false);

	async function load() {
		loading = true;
		loadError = false;
		try {
			const res = await fetch(`/api/contacts/${contactId}/replies`);
			if (!res.ok) throw new Error('failed');
			replies = await res.json();
		} catch {
			loadError = true;
		} finally {
			loading = false;
		}
	}

	load();

	async function send() {
		const message = draft.trim();
		if (!message || sending) return;
		sending = true;
		try {
			const res = await fetch(`/api/contacts/${contactId}/replies`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message })
			});
			if (!res.ok) throw new Error('failed');
			const reply = await res.json();
			replies = [...replies, reply];
			draft = '';
		} catch {
			// Lad beskeden blive stående i tekstfeltet, så brugeren kan prøve igen.
		} finally {
			sending = false;
		}
	}
</script>

<div class="border-t border-border mt-3 pt-3 space-y-3">
	{#if loading}
		<p class="text-xs text-muted-foreground">Henter samtale...</p>
	{:else if loadError}
		<p class="text-xs text-destructive">Kunne ikke hente svar. Prøv at genindlæse siden.</p>
	{:else}
		{#each replies as reply (reply.ID)}
			{@const isMine = reply.SenderID === myUserId}
			<div class="flex {isMine ? 'justify-end' : 'justify-start'}">
				<div
					class="max-w-[80%] px-3 py-2 text-sm whitespace-pre-wrap {isMine
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-foreground'}"
				>
					{reply.Message}
					<div class="text-[10px] mt-1 opacity-70">
						{new Date(reply.CreatedAt).toLocaleDateString('da-DK', {
							day: 'numeric',
							month: 'short',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</div>
				</div>
			</div>
		{/each}
		{#if replies.length === 0}
			<p class="text-xs text-muted-foreground">Ingen svar endnu.</p>
		{/if}

		<form
			onsubmit={(e) => {
				e.preventDefault();
				send();
			}}
			class="flex gap-2 pt-1"
		>
			<textarea
				bind:value={draft}
				rows="2"
				placeholder="Skriv et svar..."
				class="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
			></textarea>
			<button
				type="submit"
				disabled={sending || !draft.trim()}
				class="px-4 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Send
			</button>
		</form>
	{/if}
</div>
