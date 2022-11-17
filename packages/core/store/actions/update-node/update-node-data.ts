import { nodesMap } from '../../nodes-proxy';

export const updateNodeData = (id: string, updates: any) => {
	const node = nodesMap.get(id);

	if (node) {
		node.data = {
			...node.data,
			...updates,
		};
	}
};
