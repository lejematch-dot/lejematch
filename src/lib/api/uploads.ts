import { API_BASE_URL } from '$env/static/private';

export async function uploadImage(file: File, token: string): Promise<{ url: string }> {
	const formData = new FormData();
	formData.append('file', file);

	const res = await fetch(`${API_BASE_URL}/api/v1/uploads`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: formData
	});

	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new Error(`Upload ${res.status}: ${text}`);
	}

	return res.json();
}
