import { ActionIcon, Group, Paper, Title, Tooltip } from '@mantine/core';
import { FC, useCallback, memo } from 'react';
import { Handle, Position } from 'reactflow';

import { graph, nodesMap } from '@anima/core';
import { IconChevronsRight } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { NodeSection } from '../node-section';
import { InputNodeProps } from './input-node.props';
import { InputIcon } from './input-icon';
import { InputControls } from './input-controls';

const useUpdateEdges = (id: string) => {
	const udateEdges = useCallback(() => {
		const nodes = graph.predecessors(id);
		if (!nodes) return;
		nodes.forEach((i: string) => {
			if (nodesMap.has(i)) {
				nodesMap.get(i)!.data.timestamp = Date.now();
			}
		});
	}, [id]);

	return udateEdges;
};

export const InputNode: FC<InputNodeProps> = memo(({ data, id }) => {
	const onExecute = useUpdateEdges(id);
	const [visible, handler] = useDisclosure(false);

	return (
		<Paper shadow="md" radius="md" sx={{ width: '320px' }}>
			<InputControls {...{ visible, handler }} />

			<NodeSection>
				<Group position="apart" py="6px" px="2px">
					<Group spacing="sm">
						<Tooltip label="Input panel">
							<InputIcon onClick={handler.open} />
						</Tooltip>
						<Title order={6}>{data.label}</Title>
					</Group>

					<Group position="apart">
						<Group position="right" spacing="xs">
							<ActionIcon variant="light" radius="xl" onClick={onExecute}>
								<IconChevronsRight />
							</ActionIcon>
						</Group>
					</Group>
				</Group>
			</NodeSection>

			<Handle position={Position.Right} type="source" />
		</Paper>
	);
});

export default InputNode;
