import { useState } from 'react';
import { vestResolver } from '@hookform/resolvers/vest';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import { validator } from './validator';
import { RegisterProps } from './types';

export const useRegister = (): [
	register: UseFormRegister<RegisterProps>,
	onSubmit: () => void,
	errors: FieldErrors<RegisterProps>,
	loading: boolean
] => {
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterProps>({
		resolver: vestResolver(validator),
	});

	const onSubmit = handleSubmit(async data => {
		try {
			console.log('form submited: ', data);

			setLoading(true)
			const res = await axios('/api/auth/signup', {
				method: 'POST',
				data: {
					name: data.name,
					email: data.email,
					password: data.password,
				},
			});

			setLoading(false)

			

			console.log(res);
		} catch (err) {
			if (err instanceof AxiosError) {
				setError('root', {
					message: err.response?.data.message as string || "",
				});
			}

			setLoading(false)

			//
		}
	});

	return [register, onSubmit, errors, loading];
};
