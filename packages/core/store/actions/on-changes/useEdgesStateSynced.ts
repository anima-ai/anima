import { useCallback, useEffect, useState } from 'react';
import {
	Edge,
	applyEdgeChanges,
	OnEdgesChange,
	OnConnect,
	Connection,
	EdgeChange,
	EdgeAddChange,
	EdgeResetChange,
	EdgeRemoveChange,
} from 'reactflow';
import { snapshot, subscribe } from 'valtio';
import { edges as supaEdges } from '@anima/supabase';

import { edgesMap, nodesMap } from '../../nodes-proxy';
import { addGraphEdge, workspaceProxy } from '../../workspace-proxy';

const createEdge = async (source: any, target: any) => {
	const { flows } = snapshot(workspaceProxy);
	const nodes = snapshot(nodesMap);

	const id = await supaEdges.create(
		flows[0].id,
		source,
		target,
		nodes.get(source)?.type,
		nodes.get(target)?.type,
	);
	return String(id);
};

const isEdgeAddChange = (change: EdgeChange): change is EdgeAddChange =>
	change.type === 'add';
const isEdgeResetChange = (change: EdgeChange): change is EdgeResetChange =>
	change.type === 'reset';
const isEdgeRemoveChange = (change: EdgeChange): change is EdgeRemoveChange =>
	change.type === 'remove';

export function useEdgesStateSynced(): [Edge[], OnEdgesChange, OnConnect] {
	const [edges, setEdges] = useState<Edge[]>([]);

	const onEdgesChange = useCallback((changes: EdgeChange[]) => {
		const currentEdges = Array.from(edgesMap.values()).filter(e => e);
		const nextEdges = applyEdgeChanges(changes, currentEdges as any);
		changes.forEach((change: EdgeChange) => {
			if (isEdgeRemoveChange(change)) {
				edgesMap.delete(change.id);
			} else if (!isEdgeAddChange(change) && !isEdgeResetChange(change)) {
				const tmp = nextEdges.find(n => n.id === change.id);
				if (tmp) {
					addGraphEdge(tmp.source, tmp.target);
				}
				edgesMap.set(change.id, tmp as any);
			}
		});
	}, []);

	const onConnect = useCallback(async (params: Connection | Edge) => {
		const { source, target } = params;
		const id = await createEdge(source!, target!);

		edgesMap.set(String(id), {
			source: source!,
			target: target!,
			id: id,
		});

		addGraphEdge(source!, target!);
	}, []);

	useEffect(() => {
		const observer = () => {
			setEdges(Array.from(edgesMap.values()));
		};

		setEdges(Array.from(edgesMap.values()));
		const unsub = subscribe(edgesMap, observer);

		return () => {
			unsub();
		};
	}, [setEdges]);

	return [edges, onEdgesChange, onConnect];
}

export default useEdgesStateSynced;
