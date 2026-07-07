export interface User {
	ID: number;
	FirstName: string;
	LastName: string;
	Email: string;
	Phone: string;
	IsAdmin: boolean;
	IsActive: boolean;
	CreatedAt: string;
	UpdatedAt: string;
}

export type UserType = 'tenant' | 'landlord';

export interface UserProfile {
	displayName: string;
	bio: string;
	city: string;
	imageURL: string;
	age: number | null;
	userType: UserType | string;
	facebookURL: string;
}
