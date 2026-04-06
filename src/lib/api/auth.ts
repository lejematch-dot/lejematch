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
