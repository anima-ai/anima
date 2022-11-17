import { Position } from 'reactflow';

import { commentNodes, outputNodes, promptNodes } from '@anima/supabase';

import { snapshot } from 'valtio';
import { initialPromptData, NodeType, PromptNodeData } from '../../../types';
import { graph, workspaceProxy } from '../../workspace-proxy';
import { nodesMap } from '../../nodes-proxy';

const getId = (type: NodeType, id: any) => `${NodeType[type]}-${id}`;

export const createNode = async (
	type: NodeType,
	position = { x: 100, y: 100 },
) => {
	const { flows } = snapshot(workspaceProxy);

	switch (type) {
		case NodeType.PROMPT: {
			const data: PromptNodeData = {
				...initialPromptData,
			};
			const { id } = await promptNodes.create(flows[0].id, position);
			if (!id) return;
			const _id = getId(type, String(id));

			graph.setNode(_id);

			nodesMap.set(_id, {
				connectable: true,
				sourcePosition: Position.Left,
				targetPosition: Position.Right,
				id: _id,
				type,
				data: data,
				position,
				style: { padding: 0 },
			});
			return;
		}
		case NodeType.COMMENT: {
			const { id } = await commentNodes.create(flows[0].id, position);
			if (!id) return;
			const _id = getId(type, String(id));

			nodesMap.set(_id, {
				connectable: true,
				id: _id,
				type,
				data: {
					contents: initialPromptData.contents,
				},
				position,
				style: { padding: 0 },
			});
			return;
		}
		case NodeType.OUTPUT: {
			const { id } = await outputNodes.create(flows[0].id, position);
			if (!id) return;
			const _id = getId(type, String(id));

			nodesMap.set(_id, {
				connectable: true,
				sourcePosition: Position.Left,
				id: _id,
				type,
				data: {},
				position,
				style: { padding: 0 },
			});
			return;
		}
	}
};
