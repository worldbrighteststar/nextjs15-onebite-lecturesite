import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import { ReactNode } from 'react';

export default function Home() {
	return (
		<>
			<h1 className={styles.h1}>인덱스</h1>
			<h2 className={styles.h2}>인덱스</h2>
		</>
	);
}

/**
 * This page has getLayout method which returns itself with SearchableLayout Component.
 * refers to _app.tsx
 */
Home.getLayout = (page: ReactNode) => {
	return <SearchableLayout>{page}</SearchableLayout>;
};
