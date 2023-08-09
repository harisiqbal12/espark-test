/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserState {
	email: string | null;
	authenticated: boolean | null;
	name: string | null;
	type: 'USER' | 'ADMIN' | null;
}

export interface StoreTypes {
	user: UserState;
	item: ItemTypes;
}

export interface ItemTypes {
	items: Array<ItemsProps>;
	error: string | null;
	loading: boolean;
}

export interface ItemsProps {
	id: string;
	name: string;
	available: boolean;
	description: string | null;
	type: 'NEWSPAPER' | 'DOCUMENTARIES' | 'BOOKS';
	data: string | null;
	borrow: {
		name: string;
		email: string;
	} | null;
	author: {
		name: string;
	} | null;

	createdAt: any;
}
