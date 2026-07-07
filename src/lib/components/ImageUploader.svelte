<script lang="ts">
	let {
		name = 'Images',
		multiple = true,
		initialUrls = [],
		min = 0
	}: {
		name?: string;
		multiple?: boolean;
		initialUrls?: string[];
		min?: number;
	} = $props();

	let images = $state<string[]>([...initialUrls]);
	let uploading = $state(false);
	let error = $state('');
	let fileInput: HTMLInputElement;

	async function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;
		error = '';
		uploading = true;

		const files = multiple ? Array.from(fileList) : [fileList[0]];

		try {
			for (const file of files) {
				const formData = new FormData();
				formData.append('file', file);
				const res = await fetch('/api/uploads', { method: 'POST', body: formData });
				if (!res.ok) throw new Error('upload failed');
				const { url } = await res.json();
				images = multiple ? [...images, url] : [url];
			}
		} catch {
			error = 'Kunne ikke uploade billedet. Prøv igen.';
		} finally {
			uploading = false;
			if (fileInput) fileInput.value = '';
		}
	}

	function removeImage(index: number) {
		images = images.filter((_, i) => i !== index);
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
