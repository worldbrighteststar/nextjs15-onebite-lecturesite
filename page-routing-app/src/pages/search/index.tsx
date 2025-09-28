import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import Head from 'next/head';

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext,
// ) => {
// 	const q = context.query.q;
// 	const searchedBooks = await fetchBooks(q as string);
// 	return { props: { searchedBooks } };
// };

// export default function Page({
// 	searchedBooks,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Page() {
	// React App style : using useState and useEffect
	const [searchedBooks, setSearchedBooks] = useState<BookData[]>([]);
	const router = useRouter();
	const { q } = router.query;

	const fetchSearchedBooks = async () => {
		const data = await fetchBooks(q as string);
		setSearchedBooks(data);
	};

	useEffect(() => {
		if (q) {
			fetchSearchedBooks();
		}
	}, [q]);

	return (
		<div>
			<Head>
				<title>OneBite Book - Search Result</title>
				<meta property="og:image" content="/thumbnail.png" />
				<meta property="og:title" content="onebitebooks - search results" />
				<meta property="og:description" content="meet books in onebitebooks" />
			</Head>
			{searchedBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
