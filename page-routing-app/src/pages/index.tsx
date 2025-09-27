import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// executed before component, fetching data from server
export const getServerSideProps = async () => {
	/**
	 * These codes run serially
	 * const allBooks = await fetchBooks();
	 * const randomeBooks = await fetchRandomBooks();
	 */
	const [allBooks, randomeBooks] = await Promise.all([
		fetchBooks(),
		fetchRandomBooks(),
	]);

	return { props: { allBooks, randomeBooks } };
};

export default function Home({
	allBooks,
	randomeBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// console.log(allBooks);
	return (
		<div className={styles.container}>
			<section>
				<h3>Recommandations</h3>
				{randomeBooks.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>All Books</h3>
				{allBooks.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
		</div>
	);
}

/**
 * This page has getLayout method which returns itself with SearchableLayout Component.
 * refers to _app.tsx
 */
Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
