import { isEmpty, splitEvery } from 'ramda';
// @ts-ignore
import { encode, decode } from 'gpt-3-encoder';

export const getChunksByToken = (
	file: string,
	chunk_size: number,
	chunk_overlap: number,
) => {
	if (isEmpty(file)) {
		return [];
	}
	const encoded = encode(file);

	const getChunks = (size = 1, txt: string, _overlap = 0) => {
		const chunks = splitEvery(size, txt);
		if (!chunks.length) return [];
		const result = [];

		result.push(chunks[0]);
		for (let i = 1; i < chunks.length; i++) {
			const chunk = chunks[i - 1];
			const nextChunk = chunks[i];

			if (nextChunk) {
				const overlapChunk = chunk.slice(chunk.length - _overlap, chunk.length);
				// @ts-ignore
				result.push([...overlapChunk, ...nextChunk]);
			}
		}

		return result.map(decode);
	};

	const chunkData = getChunks(chunk_size, encoded, chunk_overlap);

	return chunkData;
};
