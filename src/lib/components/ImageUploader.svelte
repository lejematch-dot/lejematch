<script lang="ts">
	let {
		name = 'Images',
		multiple = true,
		initialUrls = [],
		min = 0,
		endpoint = '/api/uploads'
	}: {
		name?: string;
		multiple?: boolean;
		initialUrls?: string[];
		min?: number;
		/** Overrides the upload endpoint — used on the registration page, where
		 *  there's no session yet to authenticate the default endpoint with. */
		endpoint?: string;
	} = $props();

	let images = $state<string[]>([...initialUrls]);
	let imageKeys = $state<(string | null)[]>(initialUrls.map(() => null));
	let uploading = $state(false);
	let error = $state('');
	let fileInput: HTMLInputElement;

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
				<div class="relative aspect-square bg-muted overflow-hidden group">
					<img src={url} alt="" class="w-full h-full object-cover" />
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
