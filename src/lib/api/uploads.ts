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
		const body = await res.json().catch(() => null);
		throw new Error(body?.error || res.statusText || 'Upload fejlede');
	}

	return res.json();
}
