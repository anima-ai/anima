import {
	commentNodes,
	edges,
	outputNodes,
	promptNodes,
} from '@anima/supabase';
import { graph } from '../../workspace-proxy';
import { nodesMap, edgesMap } from '../../nodes-proxy';
import { NodeType } from '../../../types';

export const deleteNode = (id: string, type: NodeType = NodeType.PROMPT) => {
	switch (type) {
		case NodeType.PROMPT: {
			graph.removeNode(id);
			promptNodes.delete(id);
			nodesMap.delete(id);

			Array.from(edgesMap.entries()).forEach(([edgeId, edge]) => {
				if (edge.source === id || edge.target === id) {
					edges.delete(edge.id);
					edgesMap.delete(edgeId);
				}
			});
			return;
		}
		case NodeType.OUTPUT: {
			graph.removeNode(id);
			outputNodes.delete(id);
			nodesMap.delete(id);

			Array.from(edgesMap.entries()).forEach(([edgeId, edge]) => {
				if (edge.source === id || edge.target === id) {
					edges.delete(edge.id);
					edgesMap.delete(edgeId);
				}
			});
			return;
		}
		case NodeType.COMMENT: {
			commentNodes.delete(id);
			nodesMap.delete(id);

			return;
		}
	}
};
