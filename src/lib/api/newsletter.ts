import { apiFetch } from './client';

export function unsubscribeNewsletter(token: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>(`/newsletter/unsubscribe/${token}`);
}

export function subscribeNewsletter(token: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>(`/newsletter/subscribe/${token}`);
}
