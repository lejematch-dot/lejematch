import { apiFetch } from './client';

interface LoginResponse {
	token: string;
}

export function login(email: string, password: string): Promise<LoginResponse> {
	return apiFetch<LoginResponse>('/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password })
	});
}

export function forgotPassword(email: string): Promise<{ success: boolean; accountExists: boolean }> {
	return apiFetch<{ success: boolean; accountExists: boolean }>('/auth/forgot-password', {
		method: 'POST',
		body: JSON.stringify({ email })
	});
}

export function resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>('/auth/reset-password', {
		method: 'POST',
		body: JSON.stringify({ token, newPassword })
	});
}
