import type { Listing, ListingFilters, ListingsResponse } from '$lib/types/listing';
import { apiFetch } from './client';

export function getListings(filters: ListingFilters = {}, token?: string): Promise<ListingsResponse> {
	const params = new URLSearchParams();
	for (const [k, v] of Object.entries(filters)) {
		if (v !== undefined && v !== '') params.set(k, String(v));
	}
	const qs = params.toString() ? `?${params}` : '';
	return apiFetch<ListingsResponse>(`/listings${qs}`, { token });
}

export function getListing(id: number, token?: string): Promise<Listing> {
	return apiFetch<Listing>(`/listings/${id}`, { token });
}

export function createListing(data: Partial<Listing>, token: string): Promise<Listing> {
	return apiFetch<Listing>('/listings', {
		method: 'POST',
		body: JSON.stringify(data),
		token
	});
}

export function updateListing(id: number, data: Partial<Listing>, token: string): Promise<Listing> {
	return apiFetch<Listing>(`/listings/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		token
	});
}

export function deleteListing(id: number, token: string): Promise<void> {
	return apiFetch<void>(`/listings/${id}`, { method: 'DELETE', token });
}

export function getUserListings(userId: number, token?: string): Promise<Listing[]> {
	return apiFetch<Listing[]>(`/users/${userId}/listings`, { token });
}
