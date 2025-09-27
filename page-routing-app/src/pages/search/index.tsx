import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const q = context.query.q;
	const searchedBooks = await fetchBooks(q as string);
	return { props: { searchedBooks } };
};

export default function Page({
	searchedBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	// const router = useRouter();
	// const { q } = router.query;

	return (
		<div>
			{searchedBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

Page.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
