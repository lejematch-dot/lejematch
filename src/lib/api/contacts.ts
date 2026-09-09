import type { Contact, ContactCategory, ContactReply } from '$lib/types/contact';
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

export function getReplies(contactId: number, token: string): Promise<ContactReply[]> {
	return apiFetch<ContactReply[]>(`/contacts/${contactId}/replies`, { token });
}

export function createReply(contactId: number, message: string, token: string): Promise<ContactReply> {
	return apiFetch<ContactReply>(`/contacts/${contactId}/replies`, {
		method: 'POST',
		body: JSON.stringify({ message }),
		token
	});
}
