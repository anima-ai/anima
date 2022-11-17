import {
	Stack,
	NumberInput,
	Text,
	Slider,
	SegmentedControl,
} from '@mantine/core';
import { FC, startTransition, useCallback, useState } from 'react';

import { ChunksHandleTypeEnum, inputProxy, setChunkId } from '@anima/core';

import { useSnapshot } from 'valtio';
import { useDebouncedCallback } from 'use-debounce';
import { promptNodes } from '@anima/supabase';
import { useNode } from '../../hooks';

interface Props {
	nodeId: string;
}

export const ChunkingTab: FC<Props> = ({ nodeId }) => {
	const { onUpdateNodeData, node } = useNode(nodeId);
	const { chunk_id, chunks } = useSnapshot(inputProxy);

	const [chunksType, setChunksType] = useState<ChunksHandleTypeEnum>(
		node.data.chunks_range.start !== node.data.chunks_range.end
			? ChunksHandleTypeEnum.multiple
			: ChunksHandleTypeEnum.single,
	);

	const [range, setRange] = useState<{ start: number; end: number }>(
		node.data.chunks_range,
	);

	const debouncedUpdater = useDebouncedCallback(value => {
		promptNodes.update(nodeId, { chunks_range: value });
	}, 300);

	const onChangeChunkID = useCallback(
		(id: number) => {
			const chunks_range = { start: id, end: id };
			setRange(chunks_range);
			debouncedUpdater(chunks_range);
			onUpdateNodeData({ chunks_range });

			startTransition(() => {
				setChunkId(Math.max(id, 0));
			});
		},
		[onUpdateNodeData, debouncedUpdater],
	);

	const onSliderChange = (value: number) => {
		const chunks_range = { start: 0, end: value };
		setRange(chunks_range);
		debouncedUpdater(chunks_range);
		onUpdateNodeData({ chunks_range });
	};

	const onChangeChunkHandler = (value: string) => {
		const chunks_range = { start: 0, end: 0 };
		value === 'single' && promptNodes.update(nodeId, { chunks_range });
		onUpdateNodeData({ chunks_range });
		setChunksType(value as ChunksHandleTypeEnum);
	};

	return (
		<Stack mx="lg" my="md" sx={{ maxWidth: 320 }}>
			<SegmentedControl
				onChange={onChangeChunkHandler}
				value={chunksType}
				data={[
					{
						label: 'Single Chunk',
						value: ChunksHandleTypeEnum.single,
					},
					{
						label: 'Multiple Chunks',
						value: ChunksHandleTypeEnum.multiple,
					},
				]}
			/>
			{chunksType === ChunksHandleTypeEnum.multiple ? (
				<Stack>
					<Text>Range from 0 to selected value</Text>
					<Slider
						value={range.end}
						onChange={onSliderChange}
						max={chunks.length}
					/>
				</Stack>
			) : (
				<NumberInput
					value={range.end}
					onChange={onChangeChunkID}
					mt="md"
					label="Input Block"
					min={0}
					max={chunks.length - 1}
				/>
			)}
		</Stack>
	);
};
