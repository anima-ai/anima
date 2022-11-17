import {
	ActionIcon,
	Box,
	Collapse,
	Group,
	LoadingOverlay,
	Paper,
	Title,
	Tooltip,
} from '@mantine/core';
import dynamic from 'next/dynamic';
import { Prism } from '@mantine/prism';
import { FC, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import {
	IconChevronRight,
	IconChevronsRight,
	IconCircleCaretDown,
	IconCircleCaretUp,
	IconPlayerStop,
} from '@tabler/icons';
import { useSnapshot } from 'valtio';

import { nodesMap, useActionSheet } from '@anima/core';
import { useDisclosure } from '@mantine/hooks';
import { NodeSection } from '../node-section';
import { usePromptQuery } from '../../../hooks';
import { NodeIdProvider } from '../../../context';
import { PromptNodeProps } from './prompt-node.props';
import { PromptIcon } from './prompt-icon';

const QueryUpdater = dynamic(() => import('../query-updater'), { ssr: false });

export const PromptNode: FC<PromptNodeProps> = ({ id, data }) => {
	const nodes = useSnapshot(nodesMap);
	const node = nodes.get(id);
	const { isFetching, onExecuteChain, onExecute, onCancelRequest } =
		usePromptQuery(id);

	const onShowSheet = useActionSheet(state => state.onShow);

	const onShow = useCallback(() => {
		onShowSheet(id, data);
	}, [id, data, onShowSheet]);

	const [opened, openedHandler] = useDisclosure(false);

	if (!node) return null;

	return (
		<NodeIdProvider id={id}>
			<Paper
				shadow="xs"
				radius="md"
				sx={{
					width: '400px',
					position: 'relative',
					outline: '1px solid #e2e8f0',
				}}
			>
				<QueryUpdater nodeId={id} />

				<NodeSection>
					<Group position="apart" py="6px" px="2px">
						<Group spacing="sm">
							<Tooltip label="Prompt panel">
								<PromptIcon onClick={onShow} />
							</Tooltip>
							<Title order={6}>{node.data.label}</Title>
						</Group>

						<Group position="apart">
							<Group position="right" spacing="xs">
								{isFetching && (
									<ActionIcon
										variant="light"
										radius="xl"
										onClick={onCancelRequest}
									>
										<IconPlayerStop />
									</ActionIcon>
								)}
								<ActionIcon variant="light" radius="xl" onClick={onExecute}>
									<IconChevronRight />
								</ActionIcon>
								<ActionIcon
									variant="light"
									radius="xl"
									onClick={onExecuteChain}
								>
									<IconChevronsRight />
								</ActionIcon>
								<ActionIcon variant="light" radius="xl">
									{opened ? (
										<IconCircleCaretUp onClick={openedHandler.close} />
									) : (
										<IconCircleCaretDown onClick={openedHandler.open} />
									)}
								</ActionIcon>
							</Group>
						</Group>
					</Group>
				</NodeSection>
				<Collapse in={opened}>
					<Box sx={{ position: 'relative' }}>
						<NodeSection>
							<LoadingOverlay visible={isFetching} overlayBlur={2} />

							<Prism
								noCopy
								language="markdown"
								styles={{
									code: {
										whiteSpace: 'pre-wrap',
										height: '140px',
										// overflowY: 'auto',
									},
								}}
							>
								{node?.data.result}
							</Prism>
						</NodeSection>
					</Box>
				</Collapse>

				<Handle position={Position.Right} type="source" />
				<Handle position={Position.Left} type="target" />
			</Paper>
		</NodeIdProvider>
	);
};

export default PromptNode;
