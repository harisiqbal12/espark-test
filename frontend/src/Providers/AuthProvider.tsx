/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'js-cookie';

import axios from 'axios';
import { setUser } from '../store/reducers/user.slice';
import { StoreTypes, UserState } from '../store/reducers/types';

export default function AuthProvider({
	path,
	exact,
	children,
	admin,
}: Props): JSX.Element {
	const dispatch = useDispatch();
	const user: UserState = useSelector((state: StoreTypes) => state.user);

	useEffect(() => {
		const token: any = cookies.get('jwt');

		if (!token?.length) {
			dispatch(
				setUser({
					authenticated: false,
					email: null,
					name: null,
					type: null,
				})
			);
			return;
		}

		(async () => {
			try {
				console.log(token);
				const response = await axios('/api/auth/verify', {
					method: 'POST',
					data: {
						token,
					},
				});

				console.log(response?.data?.user);
				if (response.data?.success) {
					dispatch(
						setUser({
							authenticated: true,
							email: response.data?.user?.email,
							name: response.data?.user?.name,
							type: response.data?.user?.type,
						})
					);

					return;
				}

				cookies.remove('jwt');
				dispatch(
					setUser({
						authenticated: false,
						email: null,
						name: null,
						type: null,
					})
				);
			} catch (err) {
				console.log(err);
				console.log('error at verify');
				dispatch(
					setUser({
						authenticated: false,
						email: null,
						name: null,
						type: null,
					})
				);

				cookies.remove('jwt');
				//
			}
		})();
	}, []);

	if (user.authenticated === null) {
		return <span>Loading</span>;
	}

	if (user.authenticated === false) {
		return <Redirect to='/login' />;
	}

	console.log(user);
	console.log('user 95');
	console.log(admin)

	if (admin && user.type === 'ADMIN') {
		console.log('admin true');
		return (
			<Route path={path} exact={exact}>
				{children}
			</Route>
		);
	}

	if (admin && user?.type !== 'ADMIN') {
		console.log('user true');

		return (
			<Route path={path} exact={exact}>
				You're not admin
			</Route>
		);
	}

	console.log("116")

	return (
		<Route path={path} exact={exact}>
			{children}
		</Route>
	);
}

interface Props {
	path: string;
	exact: boolean;
	children: JSX.Element;
	admin?: boolean;
}
