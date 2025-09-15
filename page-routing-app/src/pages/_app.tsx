import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const onClickButton = () => {
		router.push('/test');
	};

	/**
	 * Pages are prefeched on Link components. (exc. prefetch=false)
	 * It can be prefeched like bellow.
	 */
	useEffect(() => {
		router.prefetch('/test');
	}, []);

	return (
		<div>
			<header>
				<Link href={'/'}>index</Link>
				&nbsp;
				<Link href={'/search'} prefetch={false}>
					search
				</Link>
				&nbsp;
				<Link href={'/book/1'}>book/1</Link>
				<div>
					<button onClick={onClickButton}>/test page</button>
				</div>
			</header>
			<Component {...pageProps} />
		</div>
	);
}
