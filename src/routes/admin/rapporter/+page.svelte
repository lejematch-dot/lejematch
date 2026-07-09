<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const reasonLabel: Record<string, string> = {
		spam: 'Spam',
		svindel: 'Svindel',
		andet: 'Andet'
	};

	const targetTypeLabel: Record<string, string> = {
		listing: 'Boligopslag',
		seeker: 'Lejeropslag',
		profile: 'Profil'
	};

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('da-DK', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Rapporter – LejeMatch</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
	<div class="mb-8">
		<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Admin</p>
		<h1 class="text-3xl font-bold text-foreground uppercase tracking-tight">Rapporter</h1>
	</div>

	{#if data.reports.length === 0}
		<div class="border border-border p-8 text-center">
			<p class="text-sm text-muted-foreground">Ingen rapporter endnu.</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.reports as { report, reporterProfile, targetTitle, targetUrl } (report.ID)}
				<div
					class="border border-border p-4 {report.Status === 'resolved' ? 'opacity-50' : ''}"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="flex items-center gap-2 mb-1">
								<span class="text-xs font-bold uppercase tracking-wide {report.Status === 'resolved' ? 'text-muted-foreground' : 'text-destructive'}">
									{reasonLabel[report.Reason] ?? report.Reason}
								</span>
								<span class="text-xs text-muted-foreground">· {targetTypeLabel[report.TargetType]}</span>
								<span class="text-xs text-muted-foreground">· {formatDate(report.CreatedAt)}</span>
							</div>
							<a href={targetUrl} class="text-sm font-semibold text-foreground hover:underline">
								{targetTitle ?? `#${report.TargetID} (slettet eller ikke fundet)`}
							</a>
							<p class="text-xs text-muted-foreground mt-1">
								Rapporteret af
								<a href="/profil/{report.ReporterID}" class="underline">
									{reporterProfile?.displayName ?? `bruger #${report.ReporterID}`}
								</a>
							</p>
							{#if report.Message}
								<p class="text-sm text-muted-foreground mt-2">{report.Message}</p>
							{/if}
						</div>

						{#if report.Status === 'pending'}
							<div class="flex flex-col items-end gap-2 shrink-0">
								<form method="POST" action="?/resolve" use:enhance>
									<input type="hidden" name="id" value={report.ID} />
									<button
										type="submit"
										class="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border border-border hover:bg-muted transition-colors whitespace-nowrap"
									>
										Marker som løst
									</button>
								</form>
								<form method="POST" action="?/deleteTarget" use:enhance>
									<input type="hidden" name="reportId" value={report.ID} />
									<input type="hidden" name="targetType" value={report.TargetType} />
									<input type="hidden" name="targetId" value={report.TargetID} />
									<button
										type="submit"
										onclick={(e) => {
											if (!confirm(report.TargetType === 'profile'
												? 'Slet denne profil permanent? Dette kan ikke fortrydes.'
												: 'Slet dette opslag permanent? Dette kan ikke fortrydes.')) {
												e.preventDefault();
											}
										}}
										class="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors whitespace-nowrap"
									>
										{report.TargetType === 'profile' ? 'Slet profil' : 'Slet opslag'}
									</button>
								</form>
							</div>
						{:else}
							<span class="text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap">Løst</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
