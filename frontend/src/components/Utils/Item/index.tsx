/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ImImage } from 'react-icons/im';
import axios, { AxiosError } from 'axios';

import { ItemsProps, StoreTypes, UserState } from '../../../store/reducers/types';
import { Button } from '..';
import { useCallback, useMemo, useState } from 'react';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, deleteItem } from '../../../store/reducers/item.slice';

export default function Item({ ...el }: ItemsProps): JSX.Element {
	const dispatch = useDispatch();

	const user: UserState = useSelector((state: StoreTypes) => state.user);

	const currentUserBorrowed: boolean = useMemo(() => {
		return el?.borrow?.email === user?.email;
	}, [user.email, el?.borrow?.email]);

	const [loading, setLoading] = useState<boolean>(false);

	const handleBorrow = useCallback(async () => {
		try {
			const token = cookie.get('jwt') as string;

			if (currentUserBorrowed) {
				//return
				setLoading(true);

				const response = await axios(
					`http://localhost:4000/api/items/borrow/${el.id}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.data?.success) {
					// successfull
					dispatch(
						updateItem({
							...el,
							available: true,
						})
					);
				}

				setLoading(false);

				return;
			}

			setLoading(true);
			const response = await axios(
				`http://localhost:4000/api/items/borrow/${el.id}`,
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data?.success) {
				// successfull
				dispatch(
					updateItem({
						...el,
						available: false,
					})
				);
			}

			setLoading(false);
		} catch (err) {
			setLoading(false);

			if (err instanceof AxiosError) {
				// show modal
			}
		}
	}, [currentUserBorrowed, dispatch, el]);

	const handleDelete = useCallback(async () => {
		const token: string = cookie.get('jwt') as string;

		dispatch(
			//@ts-ignore
			deleteItem({
				id: el.id,
				token,
			})
		);
	}, [user, el.id]);

	return (
		<div className='w-full h-[30rem] rounded-lg bg-zinc-800 text-white flex flex-col p-4 gap-6 shrink-0'>
			<div className='w-full h-[50%]  bg-fuchsia-500 flex items-center justify-center rounded-lg relative'>
				{user?.type === 'ADMIN' && (
					<div
						title='Author'
						onClick={handleDelete}
						className='w-fit flex p-2 rounded-full bg-rose-500 cursor-pointer  text-xs absolute top-4 left-4 font-bold px-4'>
						<span>DELETE</span>
					</div>
				)}
				<div
					title='Author'
					className='w-fit flex p-2 rounded-full bg-zinc-900 text-xs absolute top-4 right-4 font-bold px-4'>
					<span>{el.author?.name}</span>
				</div>
				<ImImage size={60} />
			</div>
			<div className='w-full h-1/2 flex flex-col justify-between'>
				<div className='w-full flex items-center justify-between'>
					<span className='font-semibold text-xl'>{el.name}</span>
					<div className='w-fit p-2 rounded-lg text-xs text-white bg-sky-600 font-bold'>
						<span>{el.type}</span>
					</div>
				</div>
				<span className='text-xs font-semibold text-gray-200'>
					{el?.description}
				</span>

				<Button
					title={currentUserBorrowed ? 'Return' : 'Borrow'}
					style={{ width: '100%' }}
					disabled={currentUserBorrowed ? false : !el?.available}
					onClick={handleBorrow}
					loading={loading}
				/>
			</div>
		</div>
	);
}
