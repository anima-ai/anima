import { NodeType } from '@anima/core';

import { Database } from '../../../types/db_types';

export const getNodeFromOutput = ({
	id,
	position,
	contents,
	headers,
	label,
	password,
	webhook_url,
	enabled,
}: Database['public']['Tables']['output_nodes']['Row']) => {
	return {
		id: `${NodeType.OUTPUT}-${String(id)}`,
		position,
		connectable: true,
		type: NodeType.OUTPUT,
		data: {
			label,
			contents,
			headers,
			enabled,
			password,
			webhook_url,
		},
	};
};
