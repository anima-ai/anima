import { commentNodes, inputNodes, promptNodes } from '@anima/supabase';
import { snapshot } from 'valtio';

import { NodeType } from '../../../types';
import { nodesMap } from '../../nodes-proxy';

export const onNodeDragStop = async (
	id: string,
	position: { x: number; y: number },
) => {
	const nodes = snapshot(nodesMap);
	switch (nodes.get(id)?.type) {
		case NodeType.INPUT:
			inputNodes.update(id, { position });
			return;
		case NodeType.PROMPT:
			promptNodes.update(id, { position });
			return;
		case NodeType.COMMENT:
			commentNodes.update(id, { position });
			return;
		default:
			return;
	}
};
