import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const onClickButton = () => {
		router.push('/test');
	};

	return (
		<div>
			<header>
				<Link href={'/'}>index</Link>
				&nbsp;
				<Link href={'/search'}>search</Link>
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
