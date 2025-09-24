import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = () => {
	// executed before component, fetching data from server
	const data = 'hello';
	return { props: { data } };
};

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log(data);

	return (
		<div className={styles.container}>
			<section>
				<h3>Recommandations</h3>
				{books.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>All Books</h3>
				{books.map(book => (
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
