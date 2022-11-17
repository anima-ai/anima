import { Select } from '@mantine/core';
import { FC, useCallback, useMemo } from 'react';
import { GPT3EngineEnum, nodesMap } from '@anima/core';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const ModelSelector: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);

	const model = node?.data?.settings?.model || GPT3EngineEnum.Davinci002;

	const onChange = useCallback(
		(value: GPT3EngineEnum) => {
			nodesMap.get(nodeId)!.data.settings.model = value;
		},
		[nodeId],
	);

	const data = useMemo(
		() => [
			...Object.entries(GPT3EngineEnum).map(([key, value]) => ({
				label: key,
				value: value,
				group: 'GPT-3',
			})),
		],
		[],
	);

	return <Select label="Model" onChange={onChange} value={model} data={data} />;
};
