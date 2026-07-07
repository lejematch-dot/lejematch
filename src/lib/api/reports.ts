import type { CreateReportRequest, Report } from '$lib/types/report';
import { apiFetch } from './client';

export function createReport(data: CreateReportRequest, token: string): Promise<{ id: number }> {
	return apiFetch<{ id: number }>('/reports', {
		method: 'POST',
		body: JSON.stringify(data),
		token
	});
}

export function getReports(token: string): Promise<Report[]> {
	return apiFetch<Report[]>('/admin/reports', { token });
}

export function resolveReport(id: number, token: string): Promise<void> {
	return apiFetch<void>(`/admin/reports/${id}/resolve`, { method: 'PATCH', token });
}
