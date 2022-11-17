import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import {
	createNode,
	onNodeDragStop,
	useEdgesStateSynced,
	useNodesStateSynced,
} from '@anima/core';

import { useDebouncedCallback } from 'use-debounce';
import { useFlowConfig } from './hooks';
import { Sidebar } from './components';
import Provider from './provider';

const Flow = () => {
	const config = useFlowConfig();

	const reactFlowWrapper = useRef<any>(null);
	const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

	const onDragOver = useCallback((event: any) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const [nodes, onNodesChange] = useNodesStateSynced();
	const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();

	const onDrop = useCallback(
		(event: any) => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData('application/reactflow');

			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) {
				return;
			}

			const _position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});

			createNode(type, _position);
		},
		[reactFlowInstance],
	);

	return (
		<div
			className="reactflow-wrapper"
			ref={reactFlowWrapper}
			style={{ display: 'flex', flex: 1, flexGrow: 1, height: '100%' }}
		>
			<ReactFlow
				style={{ background: '#FAFBFB' }}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onNodeDragStop={useDebouncedCallback(
					(_, _node) => onNodeDragStop(_node.id, _node.position),
					300,
				)}
				onConnect={onConnect}
				onInit={setReactFlowInstance}
				{...config}
			>
				<Background />
				<Sidebar />
			</ReactFlow>
		</div>
	);
};

export default function FlowWithProvider(props: any) {
	return (
		<Provider>
			<Flow {...props} />
		</Provider>
	);
}
