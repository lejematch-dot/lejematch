<script lang="ts">
	import type { ReportTargetType } from '$lib/types/report';

	let { targetType, targetId }: { targetType: ReportTargetType; targetId: number } = $props();

	const label = targetType === 'profile' ? 'Rapportér profil' : 'Rapportér opslag';

	let open = $state(false);
	let reason = $state<'spam' | 'svindel' | 'andet'>('spam');
	let message = $state('');
	let submitting = $state(false);
	let done = $state(false);

	async function submit() {
		if (submitting) return;
		submitting = true;
		try {
			const res = await fetch('/api/reports', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ TargetType: targetType, TargetID: targetId, Reason: reason, Message: message })
			});
			if (!res.ok) throw new Error('request failed');
			done = true;
		} catch {
			// no-op — knappen forbliver åben, så brugeren kan prøve igen
		} finally {
			submitting = false;
		}
	}
</script>

<div class="relative inline-block">
	<button
		type="button"
		onclick={() => (open = !open)}
		class="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
	>
		{label}
	</button>

	{#if open}
		<div class="absolute left-0 top-full mt-2 w-64 p-3 bg-muted border border-border shadow-lg z-10 text-left">
			{#if done}
				<p class="text-xs text-foreground">Tak — din rapport er modtaget.</p>
			{:else}
				<label class="text-[11px] text-muted-foreground mb-1 block">Årsag</label>
				<select
					bind:value={reason}
					class="w-full mb-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
				>
					<option value="spam">Spam</option>
					<option value="svindel">Svindel</option>
					<option value="andet">Andet</option>
				</select>
				<textarea
					bind:value={message}
					rows="2"
					placeholder="Uddyb gerne (valgfrit)"
					class="w-full mb-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
				></textarea>
				<div class="flex gap-2">
					<button
						type="button"
						onclick={submit}
						disabled={submitting}
						class="px-2 py-1 text-[11px] font-bold uppercase tracking-wide bg-destructive text-destructive-foreground disabled:opacity-50"
					>
						Send rapport
					</button>
					<button
						type="button"
						onclick={() => (open = false)}
						class="px-2 py-1 text-[11px] uppercase tracking-wide text-muted-foreground hover:text-foreground"
					>
						Annullér
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
