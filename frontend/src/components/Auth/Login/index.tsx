import { Link } from 'react-router-dom';

import { Input, Button } from '../../Utils';
import { useLogin } from './useLogin';

export default function Login(): JSX.Element {
	const [register, onSubmit, errors, loading] = useLogin();

	return (
		<div className='w-full h-full flex flex-col p-20'>
			<h2 className='text-heading font-bold text-zinc-800'>Login</h2>
			<span className='-mt-2 font-semibold text-zinc-600'>
				login using email & password
			</span>
			<form
				onSubmit={onSubmit}
				className='w-[80%] flex h-full flex-col p-10 bg- justify-center gap-4'>
				<Input
					label='Email'
					placeholder='Enter your email'
					type='email'
					name='email'
					hookProps={register('email')}
					errorField={errors?.email?.message?.length ? true : false}
					message={errors?.email?.message}
				/>
				<Input
					label='Password'
					placeholder='Enter your password'
					type='password'
					name='password'
					hookProps={register('password')}
					errorField={errors?.password?.message?.length ? true : false}
					message={errors?.password?.message}
				/>
				<Link to='/register'>
					<span
						className='text-sx text-zinc-600 font-semibold cursor-pointer
					'>
						Don't have account?
					</span>
				</Link>
				<Button
					title='Login'
					type='submit'
					onClick={onSubmit}
					loading={loading}
				/>
			</form>
		</div>
	);
}
