import type {
	ContactSeekerRequest,
	CreateSeekerRequest,
	Seeker,
	SeekerFilters,
	SeekersResponse
} from '$lib/types/Seekers';
import { apiFetch } from './client';

export function getSeekers(filters: SeekerFilters = {}, token?: string): Promise<SeekersResponse> {
	const params = new URLSearchParams();
	for (const [k, v] of Object.entries(filters)) {
		if (Array.isArray(v)) {
			if (v.length > 0) params.set(k, v.join(','));
		} else if (v !== undefined && v !== '') {
			params.set(k, String(v));
		}
	}
	const qs = params.toString() ? `?${params}` : '';
	return apiFetch<SeekersResponse>(`/seekers${qs}`, { token });
}

export function getSeeker(id: number, token?: string): Promise<Seeker> {
	return apiFetch<Seeker>(`/seekers/${id}`, { token });
}

export async function getSeekerCities(category?: 'hele' | 'vaerelse'): Promise<string[]> {
	const qs = category ? `?category=${category}` : '';
	const res = await apiFetch<{ cities: string[] }>(`/seekers/cities${qs}`);
	return res.cities;
}

export function createSeeker(data: CreateSeekerRequest, token: string): Promise<Seeker> {
	return apiFetch<Seeker>('/seekers', {
		method: 'POST',
		body: JSON.stringify(data),
		token
	});
}

export function updateSeeker(id: number, data: Partial<Seeker>, token: string): Promise<void> {
	return apiFetch<void>(`/seekers/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		token
	});
}

export function deleteSeeker(id: number, token: string): Promise<void> {
	return apiFetch<void>(`/seekers/${id}`, { method: 'DELETE', token });
}

export function getUserSeekers(userId: number, token?: string): Promise<Seeker[]> {
	return apiFetch<Seeker[]>(`/users/${userId}/seekers`, { token });
}

export function contactSeeker(id: number, data: ContactSeekerRequest, token: string): Promise<void> {
	return apiFetch<void>(`/seekers/${id}/contact`, {
		method: 'POST',
		body: JSON.stringify(data),
		token
	});
}
