const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3000';

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
		const err = new Error(`API ${res.status}: ${text}`) as Error & { status: number };
		err.status = res.status;
		throw err;
	}

	if (res.status === 204 || res.headers.get('content-length') === '0') {
		return undefined as T;
	}
	return res.json() as Promise<T>;
}
