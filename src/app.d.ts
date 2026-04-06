import type { JwtPayload } from '$lib/types/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Locals {
			user: JwtPayload | null;
		}
	}
}

export {};
