import { Link } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { UserState, StoreTypes } from '../../store/reducers/types';
import cookie from 'js-cookie';

export default function Header(): JSX.Element {
	const user: UserState = useSelector((state: StoreTypes) => state.user);

	console.log(user);
	console.log("user")

	const handleLogout = () => {
		cookie.remove('jwt');

		window.location.reload();
	};

	return (
		<div className='w-full h-20 bg-zinc-900 flex items-center px-20 justify-between text-white font-semibold'>
			<div className='flex items-center gap-2'>
				<Link to='/'>
					<span className='hover:text-fuchsia-500 cursor-pointer'>Home</span>
				</Link>
				<span>|</span>
				<span
					className='hover:text-fuchsia-500 cursor-pointer'
					onClick={handleLogout}>
					Logout
				</span>
				<span>|</span>

				{user?.type === 'ADMIN' && (
					<Link to='/admin'>
						<span className='hover:text-fuchsia-500 cursor-pointer'>Admin</span>
					</Link>
				)}
			</div>

			<div className='flex items-center gap-4'>
				<div className='flex gap-2 items-center'>
					<div className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-black'>
						<HiOutlineUser />
					</div>
					<span>{user.name}</span>
				</div>
			</div>
		</div>
	);
}
