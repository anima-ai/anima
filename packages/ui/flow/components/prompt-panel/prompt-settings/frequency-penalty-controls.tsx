import { Chip, Group, Slider, Stack, Text } from '@mantine/core';
import { nodesMap } from '@anima/core';
import { FC, useCallback } from 'react';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const FrequencyPenaltyControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const frequency_penalty = node.data.settings.frequency_penalty;

	const onChange = useCallback(
		(value: number) => {
			nodesMap.get(nodeId)!.data.settings.frequency_penalty = Number(
				value.toFixed(2),
			);
		},
		[nodeId],
	);

	return (
		<Stack spacing="xs">
			<Group position="apart">
				<Text size="sm" weight="500">
					Frequency penalty
				</Text>

				<Chip size="xs"> {frequency_penalty.toFixed(2)}</Chip>
			</Group>
			<Slider
				size="xs"
				min={0}
				max={2}
				defaultValue={frequency_penalty}
				onChangeEnd={onChange}
				label={value => value.toFixed(2)}
				step={0.01}
				styles={{ markLabel: { display: 'none' } }}
			/>
		</Stack>
	);
};
