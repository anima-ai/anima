import { Chip, Group, Slider, Stack, Text } from '@mantine/core';
import { nodesMap } from '@anima/core';
import { FC, useCallback } from 'react';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const TemperatureControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const temperature = node.data.settings.temperature;

	const onChange = useCallback(
		(value: number) => {
			nodesMap.get(nodeId)!.data.settings.temperature = Number(
				value.toFixed(2),
			);
		},
		[nodeId],
	);

	return (
		<Stack spacing="xs">
			<Group position="apart">
				<Text size="sm" weight="500">
					Temperature
				</Text>

				<Chip size="xs"> {temperature.toFixed(2)}</Chip>
			</Group>
			<Slider
				size="xs"
				min={0}
				max={1}
				defaultValue={temperature}
				onChangeEnd={onChange}
				label={value => value.toFixed(2)}
				step={0.01}
				styles={{ markLabel: { display: 'none' } }}
			/>
		</Stack>
	);
};
