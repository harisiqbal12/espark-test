/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ItemTypes, ItemsProps } from './types';
import axios, { AxiosError } from 'axios';

const initialState: ItemTypes = {
	items: [],
	loading: false,
	error: null,
};

export const fetchItems = createAsyncThunk(
	'items/fetchItems',
	async ({ token }: { token: string }) => {
		try {
			//
			const response = await axios('http://localhost:4000/api/items', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data?.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err?.response?.data?.message);
			}

			throw new Error('failed to fetch items');
		}
	}
);

export const fetchUserItems = createAsyncThunk(
	'items/fetchUserItems',
	async ({ token }: { token: string }) => {
		try {
			//

			const response = await axios('http://localhost:4000/api/items/borrow', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response?.data?.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err?.response?.data?.message);
			}

			throw new Error('failed to fetch user borrow data');
		}
	}
);

export const deleteItem = createAsyncThunk(
	'items/deleteUserItem',
	async ({ token, id }: { token: string; id: string }) => {
		try {
			await axios(`http://localhost:4000/api/items/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return id;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err?.response?.data?.message);
			}

			throw new Error('failed to delete the item');
		}
	}
);

const itemSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<ItemTypes>) => {
			state.items = action.payload.items;
		},
		updateItem: (state, action: PayloadAction<ItemsProps>) => {
			const copy = [...state.items];

			const computed = copy.map(el => {
				if (el.id === action.payload.id) {
					return {
						...action.payload,
					};
				}

				return el;
			});

			state.items = computed;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchItems.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(
				fetchItems.fulfilled,
				(state, action: PayloadAction<ItemsProps[]>) => {
					state.loading = false;
					state.error = null;
					state.items = action.payload;
				}
			)
			.addCase(fetchUserItems.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(
				fetchUserItems.fulfilled,
				(state, action: PayloadAction<ItemsProps[]>) => {
					state.loading = false;
					state.error = null;
					state.items = action.payload;
				}
			)
			.addCase(deleteItem.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
				state.loading = false;
				const copy = [...state.items];

				const filteted = copy.filter(el => el.id !== action.payload);
				state.items = filteted;
			});
	},
});

export const { setItems, updateItem } = itemSlice.actions;
export default itemSlice.reducer;
