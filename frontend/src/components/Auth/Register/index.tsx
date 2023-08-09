import { Link } from 'react-router-dom';

import { Input, Button } from '../../Utils';
import { useRegister } from './useRegister';

export default function Register(): JSX.Element {
	const [register, onSubmit, errors, loading] = useRegister();

	console.log('errors: ', errors);
	

	return (
		<div className='w-full h-full flex flex-col p-20'>
			<h2 className='text-heading font-bold text-zinc-800'>Register</h2>
			<span className='-mt-2 font-semibold text-zinc-600'>register with us</span>
			<form
				onSubmit={onSubmit}
				className='w-[80%] flex h-full flex-col p-10 bg- justify-center gap-4'>
				<Input
					label='Name'
					placeholder='Enter your name'
					name='name'
					hookProps={register('name')}
					errorField={errors?.name?.message?.length ? true : false}
					message={errors?.name?.message}
				/>
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
				<Input
					label='Password Confirm'
					placeholder='Enter confirm password'
					type='password'
					name='password'
					hookProps={register('passwordConfirm')}
					errorField={errors?.passwordConfirm?.message?.length ? true : false}
					message={errors?.passwordConfirm?.message}
				/>

				<span className='text-xs font-semibold text-rose-500 -mt-2'>
					{errors?.root?.message}
				</span>
				<Link to='/login'>
					<span
						className='text-sx text-zinc-600 font-semibold cursor-pointer
					'>
						Already have an account?
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
