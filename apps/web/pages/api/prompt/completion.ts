import { getPromptCompletion } from '@anima/ai';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { prompt, settings } = req.body;

	try {
		const result = await getPromptCompletion(String(prompt), settings);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error });
	}
}
