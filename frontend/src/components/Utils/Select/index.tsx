import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
export default function Select({
	children,
	error,
	label = 'Select',
}: {
	children?: React.ReactNode;
	error?: boolean;
	label?: string;
}): JSX.Element {
	const [show, setShow] = useState<boolean>(false);

	const handleToggle = () => setShow(prev => !prev);

	return (
		<div
			onClick={handleToggle}
			className={`w-full h-14 rounded-lg cursor-pointer hover:bg-zinc-300 transition duration-150 relative flex items-center px-4 text-sx font-semibold text-zinc-700 ${
				error ? 'bg-red-200' : 'bg-zinc-200'
			}`}>
			<span>{label}</span>

			<AnimatePresence>
				{show && (
					<motion.div
						initial={{
							opacity: 0,
							top: 50,
						}}
						animate={{
							opacity: 1,
							top: 80,
						}}
						exit={{
							opacity: 0,
							top: 50,
						}}
						className='absolute top-20 left-0 rounded-lg h-60 bg-zinc-500 -400 z-[99999] w-full p-4 gap-4 flex flex-col'>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
