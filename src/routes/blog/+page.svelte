<script lang="ts">
	import { blogPosts } from '$lib/blog';
</script>

<div class="max-w-3xl mx-auto px-6 py-16">
	<p class="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Blog</p>
	<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-10 uppercase tracking-tight">Blog</h1>

	<div class="divide-y divide-border border-t border-b border-border">
		{#each blogPosts as post (post.slug)}
			<a href="/blog/{post.slug}" class="block py-6 hover:opacity-80 transition-opacity">
				<p class="text-xs text-muted-foreground mb-2">{post.dateLabel}</p>
				<h2 class="font-bold text-foreground text-lg uppercase tracking-wide mb-2">{post.title}</h2>
				<p class="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
			</a>
		{/each}
	</div>
</div>
