import type { RoomType, ListingStatus, RentalPeriod } from './listing';
import type { ContactRelationshipType, ContactAgeRange, ContactEmployment } from './contact';

export type SeekingType = 'bolig' | 'roommate' | 'begge';

export type FurnishedPreference = 'furnished' | 'unfurnished' | 'any';

export interface Seeker {
	ID: number;
	UserID: number;
	Title: string;
	Description: string;
	City: string;
	CityDisplay?: string;
	MaxBudget: number;
	RoomType: RoomType;
	Status: ListingStatus;
	MoveInFrom: string;
	Images: string[];
	CreatedAt: string;
	UpdatedAt: string;

	SeekingType?: SeekingType | '';
	NumPeople?: number | null;
	NumRooms?: number | null;
	FurnishedPreference?: FurnishedPreference | '';
	RentalPeriod?: RentalPeriod | '';
	RentalPeriodDetails?: string;
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
	NumRooms?: number;
	FurnishedPreference?: FurnishedPreference;
	RentalPeriod?: RentalPeriod;
	RentalPeriodDetails?: string;
}

export interface ContactSeekerRequest {
	message: string;
	senderPhone?: string;
	numPeople: number;
	relationshipType: ContactRelationshipType;
	ageRange: ContactAgeRange;
	employment: ContactEmployment;
}
