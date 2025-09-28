import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// SSR : executed before component, fetching data from server
// export const getServerSideProps = async () => {

// SSG : executed during build time
export const getStaticProps = async () => {
	/**
	 * These codes run serially
	 * const allBooks = await fetchBooks();
	 * const randomeBooks = await fetchRandomBooks();
	 */
	const [allBooks, randomeBooks] = await Promise.all([
		fetchBooks(),
		fetchRandomBooks(),
	]);

	return { props: { allBooks, randomeBooks }, revalidate: 10 }; // original ISR > revalidate : x(sec)
};

export default function Home({
	allBooks,
	randomeBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	// console.log(allBooks);
	return (
		<div className={styles.container}>
			<section>
				<h3>Recommandations</h3>
				{randomeBooks &&
					randomeBooks.map(book => <BookItem key={book.id} {...book} />)}
			</section>
			<section>
				<h3>All Books</h3>
				{allBooks && allBooks.map(book => <BookItem key={book.id} {...book} />)}
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
