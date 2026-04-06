export interface JwtPayload {
	sub: number;
	email: string;
	is_admin: boolean;
	is_active: boolean;
}
