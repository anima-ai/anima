import type { Node } from 'reactflow';
import { InputNode, NodeType } from '../../../types';

export const parseInputToGraphNode = (input: InputNode): Node => {
	const { position, ...rest } = input;

	return {
		id: `${NodeType.INPUT}-${String(rest.id)}`,
		position: position,
		connectable: true,
		draggable: false,
		type: NodeType.INPUT,
		data: {
			timestamp: Date.now(),
			...rest,
		},
	};
};
