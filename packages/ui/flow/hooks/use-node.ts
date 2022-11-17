import { useCallback } from 'react';
import { snapshot, useSnapshot } from 'valtio';

import {
	graph,
	BaseNodeData,
	nodesMap,
	inputProxy,
	updateNodeData,
	deleteNode,
	NodeType,
} from '@anima/core';
import { commentNodes, outputNodes, promptNodes } from '@anima/supabase';

export const useNode = (nodeId: string) => {
	const nodes = useSnapshot(nodesMap);
	const node = nodes.get(nodeId);

	const onUpdateNodeData = useCallback(
		(data: Partial<BaseNodeData>) => {
			updateNodeData(nodeId, data);
		},
		[nodeId],
	);

	const onUpdateNodeLabel = useCallback(
		(label: string) => {
			nodesMap.get(nodeId)!.data.label = label;

			updateNodeData(nodeId, { label });
			nodesMap.forEach(node => {
				const ops = node?.data?.contents?.ops ?? [];
				if (ops && ops.length) {
					ops.forEach((op: any) => {
						if (op?.insert?.mention?.id === nodeId) {
							op.insert.mention.value = label;
						}
					});
				}
			});
		},
		[nodeId],
	);

	const onUpdateQuery = useCallback(
		(query: string) => {
			if (nodesMap.has(nodeId)) {
				nodesMap.get(nodeId)!.data.query = query;
			}
		},
		[nodeId],
	);

	const onUpdateResult = useCallback(
		(result: string) => {
			const { chunk_id } = snapshot(inputProxy);

			const _node = nodesMap.get(nodeId)!;
			_node.data.result = result;
			_node.data.currentChunk = chunk_id;
		},
		[nodeId],
	);

	const onUpdateEditorContents = useCallback(
		(contents: any, type: NodeType = NodeType.PROMPT) => {
			switch (type) {
				case NodeType.PROMPT: {
					promptNodes.update(nodeId, { contents });
					if (nodesMap.has(nodeId)) {
						nodesMap.get(nodeId)!.data.contents = contents;
					}
					return;
				}
				case NodeType.COMMENT: {
					commentNodes.update(nodeId, { contents });
					if (nodesMap.has(nodeId)) {
						nodesMap.get(nodeId)!.data.contents = contents;
					}
					return;
				}
				case NodeType.OUTPUT: {
					outputNodes.update(nodeId, { contents });
					if (nodesMap.has(nodeId)) {
						nodesMap.get(nodeId)!.data.contents = contents;
					}
					return;
				}
			}
		},
		[nodeId],
	);

	const onDelete = useCallback(() => {
		deleteNode(nodeId);
	}, [nodeId]);

	const forceUpdateSuccessor = useCallback(() => {
		const pre = graph.predecessors(nodeId);
		if (!pre) return;
		pre.forEach((p: any) => {
			updateNodeData(p, { timestamp: Date.now() });
		});
	}, [nodeId]);

	return {
		node: node!,
		onUpdateNodeData,
		onUpdateEditorContents,
		onUpdateQuery,
		onUpdateResult,
		onUpdateNodeLabel,
		onDelete,
		forceUpdateSuccessor,
	};
};
