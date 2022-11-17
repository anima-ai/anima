import { nodesMap } from '@anima/core';
import { snapshot } from 'valtio';
import { isEmpty } from 'ramda';

export class GetPromptDto {
	prompt!: string;
	settings!: any;
}

import { nextApi } from '../../client';

export function toPlaintext(delta: { ops: any[] }, chunk: string) {
	if (!delta?.ops) return '';
	if (delta.ops.length === 0) return '';
	return delta.ops.reduce(function (text, op) {
		if (!op.insert)
			throw new TypeError('only `insert` operations can be transformed!');
		if (op.insert?.mention?.id) {
			const node = snapshot(nodesMap).get(op.insert.mention.id)!;
			if (node.type == 'InputCell') {
				return text + chunk;
			} else {
				return text + node.data.result;
			}
		}
		if (typeof op.insert !== 'string') return text + ' ';
		return text + op.insert;
	}, '');
}

interface ExtraConfig {
	type: 'single' | 'multiple';
	chunksRange: number;
	chunks: string[];
	contents: { ops: any[] };
}

export const getPrompt = async (
	params: GetPromptDto,
	config?: ExtraConfig,
	axiosConfig?: any,
): Promise<any> => {
	if (isEmpty(params.prompt.trim())) {
		return {};
	}

	// if (config?.type === 'multiple' && config?.chunksRange > 0) {
	// 	let result = '';

	// 	for (let i = 0; i < config.chunksRange; i++) {
	// 		const chunk = config.chunks[i];
	// 		const prompt = toPlaintext(config.contents, chunk);
	// 		const { data } = await nextApi.post<any>(
	// 			'/',
	// 			{
	// 				prompt,
	// 				settings: params.settings,
	// 			},
	// 			axiosConfig,
	// 		);

	// 		result += data.text;
	// 	}

	// 	return { text: result };
	// } else {
	const { data } = await nextApi.post<any>(
		'/prompt/completion',
		{
			...params,
		},
		axiosConfig,
	);

	return data;
	// }
};
