import { NodeType } from '@anima/core';

import { initialPromptData } from '../../../types';
import { Database } from '../../../types/db_types';

export const getNodeFromPrompt = ({
	id,
	position,
	label,
	settings,
	chunks_range,
	description,
	contents,
	result,
}: Database['public']['Tables']['prompt_nodes']['Row']) => {
	return {
		id: `${NodeType.PROMPT}-${String(id)}`,
		position,
		connectable: true,
		type: NodeType.PROMPT,
		data: {
			...initialPromptData,
			timestamp: Date.now(),
			label: label,
			settings: settings,
			chunks_range: chunks_range,
			description: description,
			contents: contents,
			result: result,
		},
	};
};
