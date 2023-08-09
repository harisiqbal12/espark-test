/* eslint-disable @typescript-eslint/ban-ts-comment */

/* on login and register i used uncontrolled form and now im giving controlled form example */

import memoize from 'fast-memoize';
import { useHistory } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import cookie from 'js-cookie';

import { Button, Input, Select } from '../Utils';

export default function CreateItem(): JSX.Element {
	const history = useHistory();

	const [values, setValues] = useState<ValuesProps>({
		name: '',
		description: '',
		data: '',
		type: null,
	});

	const [loading, setLoading] = useState<boolean>(false);

	const [valuesError, setValuesErrors] = useState<ValuesErrors>({
		name: false,
		type: false,
	});

	const [errMessage, setErrMessage] = useState<string>('');

	const handleValues = useCallback(
		memoize(
			(type: string) => (e: ChangeEvent<HTMLInputElement>) =>
				setValues(prev => ({ ...prev, [type]: e.target.value }))
		),
		[]
	);

	const handleSelect = useCallback(
		(type: 'NEWSPAPER' | 'DOCUMENTARIES' | 'BOOKS') => {
			setValues(prev => ({ ...prev, type }));
		},
		[]
	);

	const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			const token = cookie.get('jwt') as string;

			const val: ValuesErrors = {
				name: false,
				type: false,
			};

			let isError: boolean = false;

			Object.keys(valuesError).forEach(el => {
				//@ts-ignore
				if (!values[el]?.length) {
					//@ts-ignore
					val[el] = true;

					isError = true;
				}
			});

			if (isError) {
				console.log(val);
				setValuesErrors(val);
				return;
			}

			setLoading(true);
			await axios('/api/items', {
				method: 'POST',
				data: {
					...values,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setLoading(false);
			setValues({
				name: '',
				description: '',
				type: null,
				data: '',
			});
			history.push('/');
		} catch (err) {
			if (err instanceof AxiosError) {
				setErrMessage(err.response?.data?.message);
				setLoading(false);

				return;
			}

			setErrMessage('failed to create new item');

			setLoading(false);
			//
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className='w-1/2 flex h-fit p-6 flex-col rounded-lg bg-zinc-800 mt-10 gap-10 shrink-0 mb-96'>
			<span className='text-white font-semibold'>ADD ITEM</span>

			<div className='w-full flex flex-col gap-4'>
				<Input
					placeholder='Enter item name'
					label=''
					name='name'
					type='text'
					value={values.name}
					onChange={handleValues('name')}
					errorField={valuesError.name}
				/>
				<Input
					placeholder='Enter item description'
					label=''
					name='description'
					type='text'
					value={values.description}
					onChange={handleValues('description')}
				/>
				<Input
					placeholder='Enter item data'
					label=''
					name='data'
					type='text'
					value={values.data}
					onChange={handleValues('data')}
				/>
				<Select label={values.type || "Select type"}  error={valuesError.type}>
					<div onClick={() => handleSelect('BOOKS')} className='select-child'>
						<span className='uppercase'>Books</span>
					</div>
					<div onClick={() => handleSelect('NEWSPAPER')} className='select-child'>
						<span className='uppercase'>News Paper</span>
					</div>
					<div
						onClick={() => handleSelect('DOCUMENTARIES')}
						className='select-child'>
						<span className='uppercase'>Documents</span>
					</div>
				</Select>
			</div>

			<span className='text-sx font-semibold text-rose-500'>{errMessage}</span>

			<div className='w-full flex justify-center'>
				<Button title='Submit' loading={loading} />
			</div>
		</form>
	);
}

interface ValuesProps {
	name: string;
	description: string;
	data: string;
	type: 'NEWSPAPER' | 'DOCUMENTARIES' | 'BOOKS' | null;
}

interface ValuesErrors {
	name: boolean;
	type: boolean;
}
