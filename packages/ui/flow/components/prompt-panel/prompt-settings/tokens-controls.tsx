import { Chip, Group, Slider, Stack, Text } from '@mantine/core';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { GPT3EngineEnum, nodesMap } from '@anima/core';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

const getMaxTokens = (m: string) => {
	switch (m) {
		case GPT3EngineEnum.Davinci002:
			return 4000;
		default:
			return 2048;
	}
};

export const TokensControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const { max_tokens, model } = node.data.settings;
	const max = useMemo(() => getMaxTokens(model), [model]);

	const onChange = useCallback(
		(value: number) => {
			nodesMap.get(nodeId)!.data.settings.max_tokens = Number(value);
		},
		[nodeId],
	);

	useEffect(() => {
		if (max < max_tokens) {
			onChange(max);
		}
	}, [max, onChange, max_tokens]);

	return (
		<Stack spacing="xs">
			<Group position="apart">
				<Text size="sm" weight="500">
					Maximum length
				</Text>

				<Chip size="xs"> {max_tokens}</Chip>
			</Group>
			<Slider
				min={1}
				max={max}
				defaultValue={max_tokens}
				onChangeEnd={onChange}
				label={value => value}
				step={1}
			/>
		</Stack>
	);
};
