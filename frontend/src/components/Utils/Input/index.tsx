/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';

import type { InputTypes } from './types';

function Input({ label, hookProps, errorField, ...props }: InputTypes): JSX.Element {
	return (
		<div className='flex flex-col'>
			<span className='text-zinc-700 font-semibold'>{label}</span>
			<input
				{...props}
				{...hookProps}
				className={`w-full h-14 rounded-lg bg-zinc-200 px-4 text-sx font-semibold outline-none focus:border border-transparent border transition duration-200 hover:border-fuchsia-500 ${errorField ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-fuchsia-500"}`}
			/>
		</div>
	);
}

export default memo(Input);
