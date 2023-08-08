export interface UserState {
	email: string | null;
	authenticated: boolean | null;
	name: string | null;
	type: 'USER' | 'ADMIN' | null;
}

export interface StoreTypes {
	user: UserState;
}
