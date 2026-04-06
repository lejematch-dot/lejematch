import type { User, UserProfile } from '$lib/types/user';
import { apiFetch } from './client';

export function getUser(id: number, token: string): Promise<User> {
	return apiFetch<User>(`/users/${id}`, { token });
}

export function updateUser(id: number, data: Partial<User>, token: string): Promise<User> {
	return apiFetch<User>(`/users/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		token
	});
}

export function deleteUser(id: number, token: string): Promise<void> {
	return apiFetch<void>(`/users/${id}`, { method: 'DELETE', token });
}

export function changePassword(
	id: number,
	data: { CurrentPassword: string; NewPassword: string },
	token: string
): Promise<void> {
	return apiFetch<void>(`/users/${id}/password`, {
		method: 'PUT',
		body: JSON.stringify(data),
		token
	});
}

export function getUserProfile(id: number): Promise<UserProfile> {
	return apiFetch<UserProfile>(`/users/${id}/profile`);
}

export function updateUserProfile(
	id: number,
	data: { DisplayName?: string; Bio?: string; City?: string; ImageURL?: string },
	token: string
): Promise<void> {
	return apiFetch<void>(`/users/${id}/profile`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		token
	});
}

export function registerUser(data: {
	email: string;
	password: string;
	name: string;
}): Promise<User> {
	return apiFetch<User>('/users', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}
