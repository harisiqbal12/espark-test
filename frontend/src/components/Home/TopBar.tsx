/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../Utils';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { fetchUserItems } from '../../store/reducers/item.slice';

function TopBar(): JSX.Element {
	const dispatch = useDispatch();

	const [show, setShow] = useState<boolean>(false);

	const handleToggle = () => setShow(prev => !prev);

	const handleFetch = useCallback(() => {
		const token = cookie.get('jwt') as string;

		dispatch(
			//@ts-ignore
			fetchUserItems({
				token,
			})
		);
	}, []);

	return (
		<div className='w-full flex items-center justify-between'>
			<span className='text-lg uppercase font-bold text-zinc-800'>Items</span>
			<div className='relative'>
				<Button
					title='Filter'
					style={{
						height: 50,
					}}
					onClick={handleToggle}
				/>

				<AnimatePresence>
					{show && (
						<motion.div
							initial={{
								opacity: 0,
								top: 30,
							}}
							animate={{
								opacity: 1,
								top: 70,
							}}
							exit={{
								opacity: 0,
								top: 50,
							}}
							className='w-40 h-20 rounded-lg bg-zinc-700 flex flex-col absolute z-[999] p-2'>
							<div
								onClick={handleFetch}
								className='w-full p-1 rounded-md bg-sky-200 hover:bg-sky-500 transition duration-200  cursor-pointer  text-sky-500 hover:text-white font-semibold flex items-center justify-center text-xs py-2 uppercase'>
								<span>My Borrowed</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default memo(TopBar);
