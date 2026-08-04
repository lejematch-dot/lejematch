import type { Contact, ContactCategory } from '$lib/types/contact';
import { apiFetch } from './client';

export function getContacts(token: string): Promise<Contact[]> {
	return apiFetch<Contact[]>('/contacts', { token });
}

export function updateContactCategory(id: number, category: ContactCategory, token: string): Promise<void> {
	return apiFetch<void>(`/contacts/${id}/category`, {
		method: 'PATCH',
		body: JSON.stringify({ category }),
		token
	});
}
