<script lang="ts">
	import type { ContactCategory } from '$lib/types/contact';

	let {
		contactId,
		initialCategory = '',
		onChange
	}: { contactId: number; initialCategory?: ContactCategory; onChange?: (category: ContactCategory) => void } =
		$props();

	let category = $state<ContactCategory>(initialCategory);
	let loading = $state(false);

	const options: { value: ContactCategory; label: string; dot: string; ring: string }[] = [
		{ value: 'green', label: 'Grøn', dot: 'bg-green-500', ring: 'ring-green-500' },
		{ value: 'yellow', label: 'Gul', dot: 'bg-yellow-400', ring: 'ring-yellow-400' },
		{ value: 'red', label: 'Rød', dot: 'bg-red-500', ring: 'ring-red-500' }
	];

	async function pick(value: ContactCategory) {
		if (loading) return;
		const next = category === value ? '' : value;
		const prev = category;
		category = next;
		loading = true;

		try {
			const res = await fetch(`/api/contacts/${contactId}/category`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ category: next })
			});
			if (!res.ok) throw new Error('request failed');
			onChange?.(next);
		} catch {
			category = prev;
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex items-center gap-1.5">
	{#each options as option (option.value)}
		<button
			type="button"
			onclick={() => pick(option.value)}
			aria-label={option.label}
			title={option.label}
			class="w-4 h-4 rounded-full {option.dot} transition-all {category === option.value
				? `ring-2 ring-offset-1 ${option.ring}`
				: 'opacity-30 hover:opacity-60'}"
		></button>
	{/each}
</div>
