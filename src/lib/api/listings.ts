import type { Listing, ListingFilters, ListingsResponse } from '$lib/types/listing';
import type { ContactRelationshipType, ContactAgeRange, ContactEmployment } from '$lib/types/contact';
import { apiFetch } from './client';

export function getListings(filters: ListingFilters = {}, token?: string): Promise<ListingsResponse> {
	const params = new URLSearchParams();
	for (const [k, v] of Object.entries(filters)) {
		if (Array.isArray(v)) {
			if (v.length > 0) params.set(k, v.join(','));
		} else if (v !== undefined && v !== '') {
			params.set(k, String(v));
		}
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

export async function getListingCities(category?: 'hele' | 'vaerelse'): Promise<string[]> {
	const qs = category ? `?category=${category}` : '';
	const res = await apiFetch<{ cities: string[] }>(`/listings/cities${qs}`);
	return res.cities;
}

export interface ContactListingRequest {
	message: string;
	senderPhone?: string;
	numPeople: number;
	relationshipType: ContactRelationshipType;
	ageRange: ContactAgeRange;
	employment: ContactEmployment;
}

export function contactListing(id: number, data: ContactListingRequest, token: string): Promise<void> {
	return apiFetch<void>(`/listings/${id}/contact`, {
		method: 'POST',
		body: JSON.stringify(data),
		token
	});
}
