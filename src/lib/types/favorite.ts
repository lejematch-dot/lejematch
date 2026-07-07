export type FavoriteType = 'listing' | 'seeker' | 'profile';

export interface Favorite {
	ID: number;
	UserID: number;
	FavoriteType: FavoriteType;
	FavoriteID: number;
	CreatedAt: string;
	UpdatedAt: string;
}
