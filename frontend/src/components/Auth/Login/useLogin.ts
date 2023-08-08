import { vestResolver } from '@hookform/resolvers/vest';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';

import { validator } from './validator';

import type { LoginProps } from './types';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export const useLogin = (): [
	register: UseFormRegister<LoginProps>,
	onSubmit: () => void,
	errors: FieldErrors<LoginProps>,
	loading: boolean
] => {
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginProps>({
		resolver: vestResolver(validator),
	});

	const onSubmit = handleSubmit(async data => {
		try {
			console.log('submitted: ', data);
			setLoading(true);
			const res = await axios('/api/auth/login', {
				method: 'POST',
				data: {
					email: data.email,
					password: data.password,
				},
			});

			console.log(res);

			setLoading(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				setError('password', {
					message: err.response?.data.message,
				});
			}
			console.log(err);
			setLoading(false);
		}
	});

	return [register, onSubmit, errors, loading];
};
