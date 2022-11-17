import { MultiSelect } from '@mantine/core';
import { nodesMap } from '@anima/core';
import { FC, useCallback, useMemo } from 'react';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const StopsControls: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);
	const stops = node.data.settings.stops;

	const data = useMemo(
		() => stops.map((value: string) => ({ value, label: value })),
		[stops],
	);

	const onChange = useCallback(
		(value: string[]) => {
			nodesMap.get(nodeId)!.data.settings.stops = value;
		},
		[nodeId],
	);

	return (
		<MultiSelect
			size="sm"
			sx={{ width: 250 }}
			label="Stop sequences"
			value={stops}
			data={data}
			onChange={onChange}
			searchable
			nothingFound="Enter a sequences"
			creatable
			getCreateLabel={query => `Add ${query}`}
			onCreate={query => {
				const item = { value: query, label: query };
				onChange([...stops, query]);
				return item;
			}}
		/>
	);
};
