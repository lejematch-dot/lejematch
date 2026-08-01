export type ContactTargetType = 'listing' | 'seeker';

export type ContactRelationshipType = '' | 'par' | 'venner' | 'andet';
export type ContactAgeRange = 'under25' | '26-35' | '35+';
export type ContactEmployment = 'fast_job' | 'studerende' | 'pensionist' | 'andet';

export const relationshipTypeLabels: Record<ContactRelationshipType, string> = {
	'': '',
	par: 'Par',
	venner: 'Venner',
	andet: 'Andet'
};

export const ageRangeLabels: Record<ContactAgeRange, string> = {
	under25: 'Under 25',
	'26-35': '26-35',
	'35+': '35+'
};

export const employmentLabels: Record<ContactEmployment, string> = {
	fast_job: 'Fast job',
	studerende: 'Studerende',
	pensionist: 'Pensionist',
	andet: 'Andet'
};

export interface Contact {
	ID: number;
	SenderID: number;
	RecipientID: number;
	TargetType: ContactTargetType;
	TargetID: number;
	Message: string;
	SenderPhone: string;
	NumPeople: number;
	RelationshipType: ContactRelationshipType;
	AgeRange: ContactAgeRange;
	Employment: ContactEmployment;
	CreatedAt: string;
	UpdatedAt: string;
}
