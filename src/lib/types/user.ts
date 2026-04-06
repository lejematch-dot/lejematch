export interface User {
	ID: number;
	Email: string;
	IsAdmin: boolean;
	IsActive: boolean;
	CreatedAt: string;
	UpdatedAt: string;
}

export interface UserProfile {
	UserID: number;
	Name: string;
	Bio: string;
	Avatar: string;
}
