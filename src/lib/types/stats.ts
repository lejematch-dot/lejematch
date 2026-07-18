export interface CityCount {
	City: string;
	Count: number;
}

export interface Stats {
	TotalUsers: number;
	ActiveUsers: number;
	NewUsers7d: number;
	NewUsers30d: number;

	TotalListings: number;
	ActiveListings: number;
	RentedListings: number;
	ArchivedListings: number;
	NewListings7d: number;

	TotalSeekers: number;
	ActiveSeekers: number;
	ArchivedSeekers: number;
	NewSeekers7d: number;

	TotalContacts: number;
	Contacts7d: number;
	Contacts30d: number;

	TopCities: CityCount[];
}
