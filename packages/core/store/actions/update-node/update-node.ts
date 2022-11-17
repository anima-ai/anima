// @ts-nocheck
import { nodesMap } from '../../nodes-proxy';

export const updateNode = (id: string, updates: any) => {
	const node = nodesMap.get(id);

	if (node) {
		nodesMap.set(id, {
			...node,
			...updates,
		});
	}
};
