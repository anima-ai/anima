import { Chip, Group, Slider, Stack, Text } from '@mantine/core';
import { FC, useCallback } from 'react';

import { nodesMap } from '@anima/core';

import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const TopPControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const top_p = node.data.settings.top_p;

	const onChange = useCallback(
		(value: number) => {
			nodesMap.get(nodeId)!.data.settings.top_p = Number(value.toFixed(2));
		},
		[nodeId],
	);

	return (
		<Stack spacing="xs">
			<Group position="apart">
				<Text size="sm" weight="500">
					Top P
				</Text>

				<Chip size="xs"> {top_p.toFixed(2)}</Chip>
			</Group>
			<Slider
				size="xs"
				min={0}
				max={1}
				defaultValue={top_p}
				onChangeEnd={onChange}
				label={value => value.toFixed(2)}
				step={0.01}
				styles={{ markLabel: { display: 'none' } }}
			/>
		</Stack>
	);
};
