export type RoomType = 'private' | 'shared' | 'apartment';

export type ListingStatus = 'active' | 'rented' | 'archived';

export type ListingKind = 'room' | '1v' | '2v' | '3v' | '4v' | '5v' | 'house';

export type LandlordType = 'boligselskab' | 'privat';

export type FurnishedPreference = 'furnished' | 'unfurnished' | 'any';

export type RentalPeriod = 'unlimited' | 'limited';

export interface Listing {
	ID: number;
	UserID: number;
	Title: string;
	Description: string;
	City: string;
	Zip: string;
	Area: string;
	Price: number;
	RoomType: RoomType;
	Status: ListingStatus;
	AvailableFrom: string;
	Images: string[];
	CreatedAt: string;
	UpdatedAt: string;

	ListingKind?: ListingKind;
	SizeSqm?: number | null;
	Deposit?: number | null;
	RentalPeriod?: RentalPeriod | '';
	RentalPeriodDetails?: string;
	LandlordType?: LandlordType | '';
	FurnishedPreference?: FurnishedPreference | '';
	Facilities?: string[];
	TargetAudience?: string;
	RoommatesWanted?: number | null;
}

export interface ListingsResponse {
	data: Listing[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface ListingFilters {
	city?: string;
	minPrice?: number;
	maxPrice?: number;
	roomType?: RoomType;
	landlordType?: LandlordType[];
	furnishedPreference?: FurnishedPreference[];
	listingKind?: ListingKind[];
	rentalPeriod?: RentalPeriod[];
	category?: 'hele' | 'vaerelse';
	page?: number;
}
