import { FC, useCallback } from 'react';
import { ActionIcon, Button, Group, Menu } from '@mantine/core';
import {
	IconChevronRight,
	IconChevronsRight,
	IconDotsVertical,
} from '@tabler/icons';

import { deleteNode, useActionSheet } from '@anima/core';
import { useNode, usePromptQuery } from '../../hooks';
interface Props {
	nodeId: string;
}

const Options = ({ nodeId }: { nodeId: string }) => {
	const { onHide } = useActionSheet();

	const onDelete = useCallback(() => {
		onHide();
		setTimeout(() => {
			deleteNode(nodeId);
		}, 300);
	}, [nodeId, onHide]);

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

export const PromptActions: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const { isFetching, onExecute, onExecuteChain } = usePromptQuery(nodeId);

	if (!node?.data) return null;
	return (
		<Group spacing="xs">
			<Options nodeId={nodeId} />
			<Button
				loading={isFetching}
				onClick={onExecute}
				size="sm"
				leftIcon={<IconChevronRight />}
			>
				Execute
			</Button>
			<Button
				loading={isFetching}
				onClick={onExecuteChain}
				size="sm"
				leftIcon={<IconChevronsRight />}
			>
				Execute Flow
			</Button>
		</Group>
	);
};
