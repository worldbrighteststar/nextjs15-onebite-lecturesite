import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
	Component,
	pageProps,
}: AppProps & {
	Component: NextPageWithLayout;
}) {
	/**
	 * If Components have getLayout function, it will be applied.
	 */
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
