import BookItem from '@/components/book-item';
import style from './page.module.css';
import books from '@/mock/books.json';
import { BookData } from '@/types';

// export const dynamic = '';
/**
 * auto : default
 * force-dynamic : set a page as a dynamic page
 * force-static : set a page as a static page
 * error : set a page as a static page or build error(when the page has to be dynamic)
 */

async function AllBooks() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
		{ cache: 'force-cache' },
	);
	if (!response.ok) {
		return <div>Fail to call BookData...</div>;
	}
	const allBooks: BookData[] = await response.json();

	return (
		<div>
			{allBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

async function RecoBooks() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
		{ next: { revalidate: 3 } },
	);
	const allBooks: BookData[] = await response.json();

	return (
		<div>
			{allBooks.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

export default function Home() {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				<RecoBooks />
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				<AllBooks />
			</section>
		</div>
	);
}
