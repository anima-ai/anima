import { Chip, Group, Slider, Stack, Text } from '@mantine/core';
import { nodesMap } from '@anima/core';
import { FC, useCallback } from 'react';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const BestOfControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const best_of = node.data.settings.best_of;

	const onChange = useCallback(
		(value: number) => {
			nodesMap.get(nodeId)!.data.settings.best_of = Number(value);
		},
		[nodeId],
	);

	return (
		<Stack spacing="xs">
			<Group position="apart">
				<Text size="sm" weight="500">
					Best Of
				</Text>

				<Chip size="xs"> {best_of.toFixed(2)}</Chip>
			</Group>
			<Slider
				size="xs"
				min={1}
				max={20}
				defaultValue={best_of}
				onChangeEnd={onChange}
				label={value => value.toFixed(2)}
				step={1}
				styles={{ markLabel: { display: 'none' } }}
			/>
		</Stack>
	);
};
