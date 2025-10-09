export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ q: string }>;
}) {
	const { q } = await searchParams;
	return (
		<div>
			Search Page
			<div>{q}</div>
		</div>
	);
}
