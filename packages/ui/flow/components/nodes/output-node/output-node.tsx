import { FC, useCallback, memo } from 'react';
import { Group, Paper, Title, Tooltip } from '@mantine/core';
import { Handle, Position } from 'reactflow';

import { outputProxy } from '@anima/core';

import { NodeSection } from '../node-section';
import { OutputNodeProps } from './output-node.props';
import { OutputIcon } from './output-icon';

export const OutputNode: FC<OutputNodeProps> = memo(({ data, id }) => {
	const onShowPanel = useCallback(() => {
		outputProxy.visible = true;
		outputProxy.id = id;
		outputProxy.headers = data.headers || [];
	}, [id, data.headers]);

	return (
		<Paper shadow="md" radius="md" sx={{ width: '320px' }}>
			<NodeSection>
				<Group position="apart" py="6px" px="2px">
					<Group spacing="sm">
						<Tooltip label="Input panel">
							<OutputIcon onClick={onShowPanel} />
						</Tooltip>
						<Title order={6}>{data.label}</Title>
					</Group>
				</Group>
			</NodeSection>

			<Handle position={Position.Left} type="target" />
		</Paper>
	);
});

export default OutputNode;
