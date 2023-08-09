export type ItemProps = {
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
};
