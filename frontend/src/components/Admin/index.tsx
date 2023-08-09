import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import CreateItem from './ItemCreate';

export default function Admin(): JSX.Element {
	const [statistics, setStatistics] = useState({
		totalItems: 0,
		totalBooks: 0,
		totalNewspaper: 0,
		totalDocumentaries: 0,
		totalAvailble: 0,
	});

	useEffect(() => {
		const token: string = cookie.get('jwt') as string;

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const r1 = axios('http://localhost:4000/api/items/stats', options);
		const r2 = axios('http://localhost:4000/api/items/stats?type=books', options);
		const r3 = axios('http://localhost:4000/api/items/stats?type=docs', options);
		const r4 = axios('http://localhost:4000/api/items/stats?type=news', options);
		const r5 = axios(
			'http://localhost:4000/api/items/stats?available=true',
			options
		);

		Promise.all([r1, r2, r3, r4, r5])
			.then(res => {
				setStatistics(prev => ({
					...prev,
					totalItems: res[0].data?.total,
					totalBooks: res[1].data?.total,
					totalDocumentaries: res[2].data?.total,
					totalNewspaper: res[3].data?.total,
					totalAvailble: res[4].data?.total,
				}));
				console.log(res);
			})
			.catch(() => {
				console.log('error occured during fetching');
			});
	}, []);

	return (
		<div className='w-full h-screen flex-col flex gap-10 py-10 px-20 items-center overflow-y-scroll'>
			<span className='uppercase text-lg font-bold text-zinc-700'>
				Admin Panel
			</span>
			<div className='w-full flex items-center justify-between'>
				<div className='w-80 h-60 rounded-lg bg-zinc-800 flex items-center justify-center flex-col text-white font-semibold'>
					<span className='text-[40px] font-bold'>
						<CountUp start={0} end={statistics.totalItems} />
					</span>
					<span>Total Items</span>
				</div>
				<div className='w-80 h-60 rounded-lg bg-zinc-800 flex items-center justify-center flex-col text-white font-semibold'>
					<span className='text-[40px] font-bold'>
						<CountUp start={0} end={statistics.totalBooks} />
					</span>
					<span>Total Books</span>
				</div>
				<div className='w-80 h-60 rounded-lg bg-zinc-800 flex items-center justify-center flex-col text-white font-semibold'>
					<span className='text-[40px] font-bold'>
						<CountUp start={0} end={statistics.totalNewspaper} />
					</span>
					<span>Total Newspaper</span>
				</div>
				<div className='w-80 h-60 rounded-lg bg-zinc-800 flex items-center justify-center flex-col text-white font-semibold'>
					<span className='text-[40px] font-bold'>
						<CountUp start={0} end={statistics.totalDocumentaries} />
					</span>
					<span>Total Documentaries</span>
				</div>
				<div className='w-80 h-60 rounded-lg bg-zinc-800 flex items-center justify-center flex-col text-white font-semibold'>
					<span className='text-[40px] font-bold'>
						<CountUp start={0} end={statistics.totalAvailble} />
					</span>
					<span>Total Available</span>
				</div>
			</div>
			<CreateItem />
		</div>
	);
}
