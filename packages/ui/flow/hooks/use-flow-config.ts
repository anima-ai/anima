import { useMemo } from 'react';
import { MarkerType, ReactFlowProps } from 'reactflow';

import { NodeType } from '@anima/core';

import { InputNode, PromptNode, OutputNode } from '../components/nodes';
import CommentCell from '../components/nodes/comment-node';

export const useFlowConfig = (): ReactFlowProps => {
	const nodeTypes = useMemo<any>(
		() => ({
			[NodeType.INPUT]: InputNode,
			[NodeType.PROMPT]: PromptNode,
			[NodeType.COMMENT]: CommentCell,
			[NodeType.OUTPUT]: OutputNode,
		}),
		[],
	);

	return {
		nodeTypes,
		zoomOnDoubleClick: false,
		defaultEdgeOptions: {
			animated: false,
			markerEnd: {
				type: MarkerType.Arrow,
			},
		},
		proOptions: {
			account: 'paid-pro',
			hideAttribution: true,
		},
		snapToGrid: true,
		fitView: true,
		maxZoom: 16,
		minZoom: 0,
	};
};

export default useFlowConfig;
