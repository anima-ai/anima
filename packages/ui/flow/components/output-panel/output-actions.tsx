import { FC, useCallback } from 'react';
import { ActionIcon, Group, Menu } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';

import { deleteNode, NodeType, outputProxy } from '@anima/core';
import { useNode } from '../../hooks';
interface Props {
	nodeId: string;
}

const Options = ({ nodeId }: { nodeId: string }) => {
	const onDelete = useCallback(() => {
		outputProxy.visible = false;
		setTimeout(() => {
			deleteNode(nodeId, NodeType.OUTPUT);
		}, 300);
	}, [nodeId]);

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon mr="sm">
					<IconDotsVertical />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={onDelete}>Delete</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export const OutputActions: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	if (!node?.data) return null;
	return (
		<Group spacing="xs">
			<Options nodeId={nodeId} />
		</Group>
	);
};
