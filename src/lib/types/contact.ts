export type ContactTargetType = 'listing' | 'seeker';

export type ContactCategory = '' | 'red' | 'yellow' | 'green';

export type ContactRelationshipType = '' | 'par' | 'venner' | 'familie' | 'andet';
export type ContactEmployment = 'fast_job' | 'studerende' | 'pensionist' | 'andet';

export const relationshipTypeLabels: Record<ContactRelationshipType, string> = {
	'': '',
	par: 'Par',
	venner: 'Venner',
	familie: 'Familie',
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

export function employmentSummary(employment: ContactEmployment, employmentOther: string): string {
	if (employment === 'andet' && employmentOther) return employmentOther;
	return employmentLabels[employment];
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
	EmploymentOther: string;
	HasPets: boolean;
	Category: ContactCategory;
	CreatedAt: string;
	UpdatedAt: string;
}
