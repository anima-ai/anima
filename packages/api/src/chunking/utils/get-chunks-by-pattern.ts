export const getChunksByPattern = (
	data: string,
	chunking_pattern: string,
): string[] => {
	if (chunking_pattern === '') return [data];
	try {
		const expression = new RegExp(chunking_pattern);

		const chunks = data.split(expression);

		return chunks;
	} catch (error) {
		return [data];
	}
};
