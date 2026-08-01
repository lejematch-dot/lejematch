export type ContactTargetType = 'listing' | 'seeker';

export type ContactRelationshipType = '' | 'par' | 'venner' | 'andet';
export type ContactEmployment = 'fast_job' | 'studerende' | 'pensionist' | 'andet';

export const relationshipTypeLabels: Record<ContactRelationshipType, string> = {
	'': '',
	par: 'Par',
	venner: 'Venner',
	andet: 'Andet'
};

export const employmentLabels: Record<ContactEmployment, string> = {
	fast_job: 'Fast job',
	studerende: 'Studerende',
	pensionist: 'Pensionist',
	andet: 'Andet'
};

export function agesSummary(ages: number[]): string {
	if (ages.length === 0) return '';
	if (ages.length === 1) return String(ages[0]);
	return `${ages.slice(0, -1).join(', ')} og ${ages[ages.length - 1]}`;
}

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
	Ages: number[];
	Employment: ContactEmployment;
	HasPets: boolean;
	CreatedAt: string;
	UpdatedAt: string;
}
