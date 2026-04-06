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

export interface UserProfile {
	displayName: string;
	bio: string;
	city: string;
	imageURL: string;
}
