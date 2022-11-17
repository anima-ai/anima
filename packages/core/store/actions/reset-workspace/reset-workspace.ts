import { NodeType, Workspace } from '../../../types';
import { edgesMap, nodesMap } from '../../nodes-proxy';
import { graph, workspaceProxy } from '../../workspace-proxy';
import { getNodeFromComment } from './get-node-from-comment';
import { getNodeFromOutput } from './get-node-from-output';
import { getNodeFromPrompt } from './get-node-from-prompt';
import { parseInputToGraphNode } from './parse-input-to-graph-node';
import { resetInput } from './reset-input';

export const resetWorkspace = (data: Workspace) => {
	const { id, title, description, type, flows, is_public, is_favorite } = data;

	if (workspaceProxy.id === data.id) {
		return;
	}
	//
	const flow = flows[0];

	workspaceProxy.id = id;
	workspaceProxy.title = title;
	workspaceProxy.description = description;
	workspaceProxy.type = type;
	workspaceProxy.flows = flows;
	workspaceProxy.is_favorite = is_favorite;
	workspaceProxy.is_public = is_public;

	const inputNode = flow.input_nodes[0];
	const commentNodes = flow.comment_nodes;
	const promptNodes = flow.prompt_nodes;
	const outputNodes = flow.output_nodes;
	const edges = flow.edges;

	resetInput(inputNode);

	nodesMap.clear();
	edgesMap.clear();
	// clears graph structure

	graph.nodes().forEach((n: any) => graph.removeNode(n));
	graph.edges().forEach((e: any) => graph.removeEdge(e));

	const inputData = parseInputToGraphNode(inputNode);

	nodesMap.set(inputData.id, inputData);
	graph.setNode(inputData.id);

	promptNodes.forEach(prompt => {
		const node = getNodeFromPrompt(prompt);
		graph.setNode(node.id);
		nodesMap.set(node.id, node as any);
	});

	commentNodes.forEach(comment => {
		const node = getNodeFromComment(comment);
		nodesMap.set(node.id, node as any);
	});

	outputNodes.forEach(output => {
		const node = getNodeFromOutput(output);
		nodesMap.set(node.id, node as any);
	});

	edges.forEach(edge => {
		const { source, target, id, source_type, target_type } = edge;

		const _source = `${NodeType[source_type]}-${source}`;
		const _target = `${NodeType[target_type]}-${target}`;

		edgesMap.set(String(id), {
			source: _source,
			target: _target,
			id: String(id),
		});
		graph.setEdge(_target, _source);
	});
};
