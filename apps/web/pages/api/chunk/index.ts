import { supabaseAdmin } from '@anima/supabase';
import type { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import {
	getChunksByPattern,
	getChunksByToken,
} from '@anima/api/src/chunking/utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const {
		chunk_overlap,
		chunk_size,
		chunk_pattern,
		chunking_type,
		file,
		user_id,
	} = req.query;

	const { data } = await supabaseAdmin.storage
		.from(`files-${user_id}`)
		.download(file as string);

	const text = await data.text();
	if (chunking_type === 'TOKENS') {
		const chunks = getChunksByToken(
			text,
			Number(chunk_size),
			Number(chunk_overlap),
		);
		res.status(200).json({ chunks });
	} else {
		const chunks = getChunksByPattern(text, String(chunk_pattern));
		res.status(200).json({ chunks });
	}
}

export const config: PageConfig = {
	api: {
		responseLimit: '10mb',
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
};
