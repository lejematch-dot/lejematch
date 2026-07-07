import type { RoomType, ListingStatus, RentalPeriod } from './listing';

export type SeekingType = 'bolig' | 'roommate';

export type FurnishedPreference = 'furnished' | 'unfurnished' | 'any';

export interface Seeker {
	ID: number;
	UserID: number;
	Title: string;
	Description: string;
	City: string;
	MaxBudget: number;
	RoomType: RoomType;
	Status: ListingStatus;
	MoveInFrom: string;
	Images: string[];
	CreatedAt: string;
	UpdatedAt: string;

	SeekingType?: SeekingType | '';
	NumPeople?: number | null;
	FurnishedPreference?: FurnishedPreference | '';
	RentalPeriod?: RentalPeriod | '';
	FacebookURL?: string;
}

export interface SeekersResponse {
	data: Seeker[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface SeekerFilters {
	city?: string;
	maxBudget?: number;
	roomType?: RoomType[];
	furnishedPreference?: FurnishedPreference[];
	rentalPeriod?: RentalPeriod[];
	category?: 'hele' | 'vaerelse';
	page?: number;
}

export interface CreateSeekerRequest {
	Title: string;
	Description: string;
	City: string;
	MaxBudget: number;
	RoomType: RoomType;
	MoveInFrom: string;
	Images: string[];
	SeekingType?: SeekingType;
	NumPeople?: number;
	FurnishedPreference?: FurnishedPreference;
	RentalPeriod?: RentalPeriod;
	FacebookURL?: string;
}

export interface ContactSeekerRequest {
	message: string;
	senderPhone?: string;
}
