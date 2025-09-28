import { NextApiRequest, NextApiResponse } from 'next';

/**
 * On Demand ISR
 * If a page need to be rerendered by specific events.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		await res.revalidate('/');
		return res.json({ revalidate: true });
	} catch {
		res.status(500).send('Revalidation Failed');
	}
}
