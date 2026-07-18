import type { Stats } from '$lib/types/stats';
import { apiFetch } from './client';

export function getStats(token: string): Promise<Stats> {
	return apiFetch<Stats>('/admin/stats', { token });
}
