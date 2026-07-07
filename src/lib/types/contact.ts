export type ContactTargetType = 'listing' | 'seeker';

export interface Contact {
	ID: number;
	SenderID: number;
	RecipientID: number;
	TargetType: ContactTargetType;
	TargetID: number;
	Message: string;
	SenderPhone: string;
	CreatedAt: string;
	UpdatedAt: string;
}
