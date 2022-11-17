import { NodeType } from '@anima/core';

import { Database } from '../../../types/db_types';

export const getNodeFromComment = ({
	id,
	position,
	contents,
}: Database['public']['Tables']['comment_nodes']['Row']) => {
	return {
		id: `${NodeType.COMMENT}-${String(id)}`,
		position,
		connectable: false,
		type: NodeType.COMMENT,
		data: {
			contents: contents,
		},
	};
};
