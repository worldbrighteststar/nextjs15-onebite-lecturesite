import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import React from 'react';
import { BookData } from '@/types';

async function Footer() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
		{ cache: 'force-cache' },
	);
	if (!response.ok) {
		return <footer>제작 @csw</footer>;
	}

	const allBooks: BookData[] = await response.json();
	const bookCnt = allBooks.length;

	return (
		<footer>
			<div>제작 @csw</div>
			<div>You can meet {bookCnt} books here.</div>
		</footer>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className={style.container}>
					<header>
						<Link href={'/'}>📚 ONEBITE BOOKS</Link>
					</header>
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
