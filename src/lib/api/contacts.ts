import type { Contact } from '$lib/types/contact';
import { apiFetch } from './client';

export function getContacts(token: string): Promise<Contact[]> {
	return apiFetch<Contact[]>('/contacts', { token });
}
