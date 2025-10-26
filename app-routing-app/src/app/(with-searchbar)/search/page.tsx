import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	await delay(1500);
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${(await searchParams).q}`,
		{ cache: 'force-cache' },
	);
	if (!response.ok) {
		return <div>Fail to call BookData</div>;
	}
	const searchedBook: BookData[] = await response.json();

	return (
		<div>
			{searchedBook.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}
