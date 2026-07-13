<script lang="ts">
	import { getObjectPosition, getPositionCoords, withPosition, stripPosition } from '$lib/imagePosition';

	let {
		name = 'Images',
		multiple = true,
		initialUrls = [],
		min = 0,
		endpoint = '/api/uploads',
		round = false
	}: {
		name?: string;
		multiple?: boolean;
		initialUrls?: string[];
		min?: number;
		/** Overrides the upload endpoint — used on the registration page, where
		 *  there's no session yet to authenticate the default endpoint with. */
		endpoint?: string;
		/** Viser miniature og fokuspunkt-editor som en cirkel — til profilbilleder. */
		round?: boolean;
	} = $props();

	let images = $state<string[]>([...initialUrls]);
	let imageKeys = $state<(string | null)[]>(initialUrls.map(() => null));
	let uploading = $state(false);
	let error = $state('');
	let fileInput: HTMLInputElement;

	let editingIndex = $state<number | null>(null);
	let editPos = $state({ x: 50, y: 50 });
	let dragging = $state(false);

	function openEditor(i: number) {
		editingIndex = i;
		editPos = getPositionCoords(images[i]);
	}

	function closeEditor() {
		editingIndex = null;
		dragging = false;
	}

	function pickFromEvent(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		editPos = { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) };
	}

	function savePosition() {
		if (editingIndex === null) return;
		const newImages = [...images];
		newImages[editingIndex] = withPosition(stripPosition(newImages[editingIndex]), editPos.x, editPos.y);
		images = newImages;
		closeEditor();
	}

	function fileKey(file: File): string {
		return `${file.name}:${file.size}:${file.lastModified}`;
	}

	async function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;
		error = '';
		uploading = true;

		const files = multiple ? Array.from(fileList) : [fileList[0]];
		const seen = new Set(imageKeys.filter((k): k is string => k !== null));
		let skipped = 0;

		try {
			for (const file of files) {
				const key = fileKey(file);
				if (seen.has(key)) {
					skipped++;
					continue;
				}
				seen.add(key);

				const formData = new FormData();
				formData.append('file', file);
				const res = await fetch(endpoint, { method: 'POST', body: formData });
				if (!res.ok) {
					const body = await res.json().catch(() => null);
					throw new Error(body?.message || 'Kunne ikke uploade billedet. Prøv igen.');
				}
				const { url } = await res.json();
				if (multiple) {
					images = [...images, url];
					imageKeys = [...imageKeys, key];
				} else {
					images = [url];
					imageKeys = [key];
				}
			}
			if (skipped > 0) {
				error = `${skipped} billede${skipped > 1 ? 'r' : ''} var allerede tilføjet og blev sprunget over.`;
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'Kunne ikke uploade billedet. Prøv igen.';
		} finally {
			uploading = false;
			if (fileInput) fileInput.value = '';
		}
	}

	function removeImage(index: number) {
		images = images.filter((_, i) => i !== index);
		imageKeys = imageKeys.filter((_, i) => i !== index);
	}

	function moveImage(index: number, direction: -1 | 1) {
		const target = index + direction;
		if (target < 0 || target >= images.length) return;

		const newImages = [...images];
		const newKeys = [...imageKeys];
		[newImages[index], newImages[target]] = [newImages[target], newImages[index]];
		[newKeys[index], newKeys[target]] = [newKeys[target], newKeys[index]];
		images = newImages;
		imageKeys = newKeys;
	}
</script>

<div class="space-y-3">
	{#each images as url, i (url + i)}
		<input type="hidden" {name} value={url} />
	{/each}

	{#if min > 0}
		<p class="text-xs {images.length < min ? 'text-destructive' : 'text-muted-foreground'}">
			{images.length} af mindst {min} billeder
		</p>
	{/if}

	{#if images.length > 0}
		{#if multiple && images.length > 1}
			<p class="text-xs text-muted-foreground">Det første billede vises som hovedbillede. Brug pilene til at ændre rækkefølgen.</p>
		{/if}
		<div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
			{#each images as url, i (url + i)}
				<div class="relative aspect-square bg-muted overflow-hidden group {round ? 'rounded-full' : ''}">
					<img
						src={url}
						alt=""
						class="w-full h-full object-cover"
						style="object-position: {getObjectPosition(url)}"
					/>
					<button
						type="button"
						onclick={() => openEditor(i)}
						aria-label="Juster billedudsnit"
						class="absolute top-1 left-1 w-6 h-6 flex items-center justify-center bg-foreground/80 text-background hover:bg-foreground transition-colors"
					>
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
					</button>
					<button
						type="button"
						onclick={() => removeImage(i)}
						aria-label="Fjern billede"
						class="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-foreground/80 text-background hover:bg-destructive transition-colors"
					>
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					{#if multiple && images.length > 1}
						<div class="absolute bottom-1 left-1 right-1 flex justify-between">
							<button
								type="button"
								onclick={() => moveImage(i, -1)}
								disabled={i === 0}
								aria-label="Flyt billede tidligere"
								class="w-6 h-6 flex items-center justify-center bg-foreground/80 text-background hover:bg-foreground transition-colors disabled:opacity-0 disabled:pointer-events-none"
							>
								<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<button
								type="button"
								onclick={() => moveImage(i, 1)}
								disabled={i === images.length - 1}
								aria-label="Flyt billede senere"
								class="w-6 h-6 flex items-center justify-center bg-foreground/80 text-background hover:bg-foreground transition-colors disabled:opacity-0 disabled:pointer-events-none"
							>
								<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if multiple || images.length === 0}
		<label
			class="flex items-center justify-center gap-2 border border-dashed border-border px-4 py-6 text-sm text-muted-foreground hover:bg-muted hover:border-foreground transition-colors cursor-pointer"
		>
			<input
				bind:this={fileInput}
				type="file"
				accept="image/jpeg,image/png,image/webp,image/gif"
				{multiple}
				class="hidden"
				onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
			/>
			{#if uploading}
				<span>Uploader...</span>
			{:else}
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<span>Vælg billede{multiple ? 'r' : ''} fra din enhed</span>
			{/if}
		</label>
	{/if}

	{#if error}
		<p class="text-xs text-destructive">{error}</p>
	{/if}
</div>

{#if editingIndex !== null}
	<div
		class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
		onclick={closeEditor}
		role="dialog"
		aria-modal="true"
	>
		<div class="bg-card border border-border max-w-sm w-full p-4" onclick={(e) => e.stopPropagation()}>
			<h3 class="text-xs font-bold uppercase tracking-widest text-foreground mb-2">Vælg billedudsnit</h3>
			<p class="text-xs text-muted-foreground mb-3">Klik eller træk på billedet for at vælge, hvad der skal være i midten.</p>

			<div
				class="relative inline-block max-w-full mx-auto"
				onclick={pickFromEvent}
				onmousedown={() => (dragging = true)}
				onmousemove={(e) => {
					if (dragging) pickFromEvent(e);
				}}
				onmouseup={() => (dragging = false)}
				onmouseleave={() => (dragging = false)}
			>
				<img
					src={stripPosition(images[editingIndex])}
					alt=""
					class="max-w-full max-h-[50vh] block select-none cursor-crosshair"
					draggable="false"
				/>
				<div
					class="absolute w-5 h-5 rounded-full border-2 border-white bg-primary shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none"
					style="left: {editPos.x}%; top: {editPos.y}%"
				></div>
			</div>

			<p class="text-xs font-medium uppercase tracking-wide text-muted-foreground mt-4 mb-2">Forhåndsvisning</p>
			<div class="w-20 h-20 bg-muted overflow-hidden {round ? 'rounded-full' : ''}">
				<img
					src={stripPosition(images[editingIndex])}
					alt=""
					class="w-full h-full object-cover"
					style="object-position: {editPos.x}% {editPos.y}%"
				/>
			</div>

			<div class="flex gap-2 mt-4">
				<button
					type="button"
					onclick={closeEditor}
					class="flex-1 px-4 py-2 text-xs font-bold uppercase tracking-wide border border-border hover:bg-muted transition-colors"
				>
					Annuller
				</button>
				<button
					type="button"
					onclick={savePosition}
					class="flex-1 px-4 py-2 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
				>
					Gem
				</button>
			</div>
		</div>
	</div>
{/if}
