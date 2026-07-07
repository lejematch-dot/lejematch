export type ReportTargetType = 'listing' | 'seeker' | 'profile';

export type ReportReason = 'spam' | 'svindel' | 'andet';

export type ReportStatus = 'pending' | 'resolved';

export interface Report {
	ID: number;
	CreatedAt: string;
	ReporterID: number;
	TargetType: ReportTargetType;
	TargetID: number;
	Reason: ReportReason;
	Message: string;
	Status: ReportStatus;
}

export interface CreateReportRequest {
	TargetType: ReportTargetType;
	TargetID: number;
	Reason: ReportReason;
	Message?: string;
}
