import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cookie from 'js-cookie';

import Register from './Register';
import Login from './Login';
import { StoreTypes, UserState } from '../../store/reducers/types';

export default function Auth(): JSX.Element {
	const history = useHistory();

	const user: UserState = useSelector((state: StoreTypes) => state.user);

	useEffect(() => {
		console.log(user.authenticated);
		console.log('authenticated');
	}, [user.authenticated]);

	function Render(): JSX.Element {
		if (history.location.pathname === '/register') {
			return <Register />;
		}

		return <Login />;
	}

	if (user.authenticated === true || cookie?.get('jwt')?.length) {
		return <Redirect to='/' />;
	}

	if (user.authenticated === null) {
		return <span>Loading</span>;
	}

	return (
		<div className='h-screen w-screen flex'>
			<div className='w-1/2 h-full flex-col bg-fuchsia-500 flex p-20 text-white shrink-0'>
				<h1 className='text-heading font-bold'>Todo</h1>
				<span className='font-semibold -mt-4'>Todo by appiskey</span>
			</div>

			<Render />
		</div>
	);
}
