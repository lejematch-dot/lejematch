import { API_BASE_URL } from '$env/static/private';

export async function apiFetch<T>(
	path: string,
	options: RequestInit & { token?: string } = {}
): Promise<T> {
	const { token, ...init } = options;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(init.headers as Record<string, string>)
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const res = await fetch(`${API_BASE_URL}/api/v1${path}`, {
		...init,
		headers
	});

	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw { status: res.status, message: text };
	}

	return res.json() as Promise<T>;
}
