import { proxyMap } from 'valtio/utils';
import { Node } from 'reactflow';

export const nodesMap = proxyMap<string, Node<any>>();

interface Edge {
	id: string;
	source: string;
	target: string;
}

export const edgesMap = proxyMap<string, Edge>();
