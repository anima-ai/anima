import { proxy } from 'valtio';
import { alg, Graph } from '@dagrejs/graphlib';
import { Workspace, WorkspaceType } from '../types';

export const graph = new Graph({
	multigraph: false,
	directed: true,
	compound: false,
});

export const addGraphEdge = (source: string, target: string) => {
	if (!graph.hasNode(source)) graph.setNode(source);
	if (!graph.hasNode(target)) graph.setNode(target);

	graph.setEdge(target, source);
};

export const getAncestors = (nodeId: string) => {
	return alg.preorder(graph, [nodeId]).filter(n => n !== nodeId) as string[];
};

export const workspaceProxy = proxy<
	Omit<Workspace, 'created_at' | 'updated_at' | 'owner' | 'owner_id'>
>({
	id: 0,
	title: '',
	description: '',
	is_favorite: false,
	is_public: false,
	type: WorkspaceType.PRIVATE,
	flows: [],
});
