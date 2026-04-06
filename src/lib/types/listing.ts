export type RoomType = 'private' | 'shared' | 'apartment';

export type ListingStatus = 'active' | 'rented' | 'archived';

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
}

export interface ListingsResponse {
	data: Listing[];
	page: number;
	limit: number;
	total: number;
}

export interface ListingFilters {
	city?: string;
	min_price?: number;
	max_price?: number;
	room_type?: RoomType;
	page?: number;
	limit?: number;
}
