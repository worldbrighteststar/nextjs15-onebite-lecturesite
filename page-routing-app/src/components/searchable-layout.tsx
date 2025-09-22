import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './searchable-layout.module.css';

export default function SearchableLayout({
	children,
}: {
	children: ReactNode;
}) {
	const router = useRouter();
	const [search, setSearch] = useState('');
	const q = router.query.q as string;

	/**
	 * If q exists, keep it on search bar.
	 */
	useEffect(() => {
		setSearch(q || '');
	}, [q]);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSubmit = () => {
		if (!search || q === search) return; // If search is blank or equal to before
		router.push(`/search?q=${search}`);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	return (
		<div>
			<div className={styles.searchbar_container}>
				<input
					value={search}
					onKeyDown={onKeyDown}
					onChange={onChangeSearch}
					placeholder="search keywords..."
				/>
				<button onClick={onSubmit}>search</button>
			</div>
			{children}
		</div>
	);
}
