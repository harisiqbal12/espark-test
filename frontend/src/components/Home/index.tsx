/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Item } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { fetchItems } from '../../store/reducers/item.slice';
import { StoreTypes } from '../../store/reducers/types';
import cookie from 'js-cookie';
import TopBar from './TopBar';

export default function Home(): JSX.Element {
	const dispatch = useDispatch();

	const items = useSelector((state: StoreTypes) => state.item);
	const user = useSelector((state: StoreTypes) => state.user);

	console.log(items);
	console.log('items');

	useEffect(() => {
		if (!user.authenticated) return;

		const token = cookie.get('jwt') as string;

		dispatch(
			//@ts-ignore
			fetchItems({
				token,
			})
		);
	}, [user.authenticated]);

	const RenderItems = useCallback((): any => {
		const array = new Array(10).fill(null);

		if (items?.loading) {
			return array.map((_, i) => (
				<div
					key={i}
					className='w-full h-[30rem] rounded-lg flex flex-col gap-6 bg-gray-400 animate-pulse'></div>
			));
		}

		return items?.items?.map((el, i) => <Item key={i} {...el} />);
	}, [items]);

	return (
		<div className='w-full h-screen overflow-y-scroll flex flex-col p-10 px-20'>
			<TopBar />
			<div className='grid grid-cols-4 gap-10 mt-10 mb-20'>
				<RenderItems />
			</div>
		</div>
	);
}
