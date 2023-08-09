import { lazy, Suspense } from 'react';

const Header = lazy(() => import('../components/Header'));

export default function LayoutProvider({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<>
			<Suspense fallback={<h1>Loading Header</h1>} >
				<Header />
			</Suspense>
			{children}
		</>
	);
}
