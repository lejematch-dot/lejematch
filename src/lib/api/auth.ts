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

export function verifyEmail(token: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>(`/auth/verify-email/${token}`);
}

export function resendVerification(email: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>('/auth/resend-verification', {
		method: 'POST',
		body: JSON.stringify({ email })
	});
}

export function forgotPassword(email: string): Promise<{ success: boolean }> {
	return apiFetch<{ success: boolean }>('/auth/forgot-password', {
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
