import { useCallback, useEffect, useState } from 'react';
import {
	applyNodeChanges,
	getConnectedEdges,
	Node,
	NodeAddChange,
	NodeChange,
	NodeResetChange,
	OnNodesChange,
} from 'reactflow';
import { subscribe } from 'valtio';
import { edgesMap, nodesMap } from '../../nodes-proxy';
import { graph } from '../../workspace-proxy';

// We are using nodesMap as the one source of truth for the nodes.
// This means that we are doing all changes to the nodes in the map object.
// Whenever the map changes, we update the nodes state.

const isNodeAddChange = (change: NodeChange): change is NodeAddChange =>
	change.type === 'add';
const isNodeResetChange = (change: NodeChange): change is NodeResetChange =>
	change.type === 'reset';

export function useNodesStateSynced(): [Node[], OnNodesChange] {
	const [nodes, setNodes] = useState<Node[]>([]);

	// The onNodesChange callback updates nodesMap.
	// When the changes are applied to the map, the observer will be triggered and updates the nodes state.
	const onNodesChanges = useCallback((changes: NodeChange[]) => {
		const nodes = Array.from(nodesMap.values());

		const nextNodes = applyNodeChanges(changes, nodes);
		changes.forEach((change: NodeChange) => {
			if (!isNodeAddChange(change) && !isNodeResetChange(change)) {
				const node = nextNodes.find(n => n.id === change.id);

				if (node && change.type !== 'remove') {
					graph.setNode(change.id);
					nodesMap.set(change.id, node);
				} else if (change.type === 'remove') {
					nodesMap.delete(change.id);
					graph.removeNode(change.id);
					// when a node is removed, we also need to remove the connected edges
					const edges = Array.from(edgesMap.values()).map(e => e);
					const connectedEdges = getConnectedEdges(nodes, edges);
					connectedEdges.forEach(edge => edgesMap.delete(edge.id));
				}
			}
		});
	}, []);

	// here we are observing the nodesMap and updating the nodes state whenever the map changes.
	useEffect(() => {
		const observer = () => {
			setNodes(Array.from(nodesMap.values()));
		};

		const unsub = subscribe(nodesMap, observer);
		setNodes(Array.from(nodesMap.values()));

		return () => {
			unsub();
		};
	}, [setNodes]);

	return [nodes.filter(n => n), onNodesChanges];
}

export default useNodesStateSynced;
