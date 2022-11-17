import { isEmpty, isNil } from 'ramda';
import {
	ActionIcon,
	Center,
	Divider,
	List,
	Modal,
	NumberInput,
	Paper,
	SegmentedControl,
	Stack,
	TextInput,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { useDebouncedCallback } from 'use-debounce';
import useDebouncedEffect from 'use-debounced-effect';
import {
	FC,
	Fragment,
	startTransition,
	useCallback,
	useMemo,
	useState,
} from 'react';
import { IconX, IconFile } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import { Prism } from '@mantine/prism';

import { useSnapshot } from 'valtio';
import {
	ChunkingType,
	inputProxy,
	setChunkId,
	setChunkOverlap,
	setChunksSize,
	setInputFile,
} from '@anima/core';
import { getFiles, inputNodes } from '@anima/supabase';
import { QueryKey } from '@anima/constants';
import { getChunksApi } from '@anima/api';

interface Props {
	visible: boolean;
	handler: any;
}

const useUpdateChunking = () => {
	const { chunk_overlap, chunk_size, chunk_pattern, chunking_type, file, id } =
		useSnapshot(inputProxy);

	const onUpdate = useCallback(async () => {
		if (isEmpty(file) || isNil(file)) return;

		const chunks = await getChunksApi({
			chunk_overlap,
			chunk_size,
			chunk_pattern,
			chunking_type,
			file: file!,
		});

		if (chunks.length > 0) {
			inputProxy.chunks = chunks;
			inputProxy.chunk_id = 0;
			inputProxy.chunk_data = chunks[0];
		}

		inputNodes.update(id, {
			chunk_overlap,
			chunk_size,
			chunk_pattern,
			chunking_type,
			file,
		});
	}, [chunk_overlap, chunk_size, chunk_pattern, chunking_type, file, id]);

	useDebouncedEffect(
		() => {
			onUpdate();
		},
		{ timeout: 1000 },
		[onUpdate],
	);
};

export const InputControls: FC<Props> = ({ visible, handler }) => {
	const {
		chunk_overlap,
		chunk_size,
		chunk_pattern,
		chunking_type,
		chunk_id,
		chunks,
		file,
	} = useSnapshot(inputProxy);

	const [value, setValue] = useState<number>(chunk_size!);
	const { data } = useQuery([QueryKey.Files], () => getFiles());

	useUpdateChunking();

	const onChangeSize = useDebouncedCallback(
		useCallback((value: any) => {
			setValue(value);
			setChunksSize(value);
		}, []),
		300,
	);

	const onChangeChunkID = useCallback((id: number) => {
		startTransition(() => {
			setChunkId(Math.max(id, 0));
		});
	}, []);

	const onSelect = useCallback((_file: string) => {
		setInputFile(_file);
	}, []);

	const renderFiles = useMemo(() => {
		if (!data) return [];
		return (
			<List spacing="xs" size="sm" center>
				{data.map(({ name }) => {
					return (
						<Fragment key={`files-${name}`}>
							<List.Item
								pb="sm"
								sx={{ cursor: 'pointer' }}
								icon={
									<ThemeIcon
										radius="xl"
										color={name === file ? 'teal' : 'indigo'}
									>
										<IconFile size={16} />
									</ThemeIcon>
								}
								onClick={() => onSelect(name)}
							>
								{name}
							</List.Item>
							<Divider />
						</Fragment>
					);
				})}
			</List>
		);
	}, [file, data, onSelect]);

	return (
		<Modal
			fullScreen
			zIndex={1000}
			withCloseButton={false}
			opened={visible}
			onClose={handler.close}
			styles={{
				body: {
					display: 'flex',
					flex: 1,
					flexDirection: 'row',
					height: '100%',
				},
			}}
			padding={0}
		>
			<ActionIcon
				sx={{ position: 'absolute', top: 12, left: 12 }}
				onClick={handler.close}
			>
				<IconX />
			</ActionIcon>
			<Paper
				p="lg"
				sx={{
					maxWidth: '260px',
					backgroundColor: '#F8F9FA',
				}}
			>
				<Stack mt="xl">
					<Title order={3} weight="normal">
						Input Selection
					</Title>
					<NumberInput
						value={chunk_id}
						onChange={onChangeChunkID}
						label="Input Block"
						min={0}
						max={chunks.length - 1}
					/>
					{renderFiles}
				</Stack>

				<Center mt="md">
					<SegmentedControl
						value={chunking_type!}
						onChange={val => {
							inputProxy.chunking_type = val as ChunkingType;
						}}
						data={[
							{ label: 'By Tokens', value: ChunkingType.TOKENS },
							{ label: 'By Pattern', value: ChunkingType.PATTERN },
						]}
					/>
				</Center>

				{chunking_type === ChunkingType.TOKENS ? (
					<>
						<NumberInput
							value={value}
							onChange={onChangeSize}
							mt="md"
							label="Chunk Size"
							description="Chunk size in tokens"
							defaultValue={64}
							min={1}
						/>

						<NumberInput
							value={chunk_overlap}
							onChange={setChunkOverlap}
							mt="md"
							label="Overlap Size"
							description={`Overlap size in tokens`}
							defaultValue={chunk_overlap}
							startValue={chunk_overlap}
							min={0}
							max={chunk_size! - 1}
						/>
					</>
				) : (
					<TextInput
						value={chunk_pattern || ''}
						onChange={v => {
							inputProxy.chunk_pattern = v.currentTarget.value;
						}}
						mt="md"
						label="Chunking pattern"
						description="String or RegExp pattern to split the input by"
					/>
				)}
			</Paper>
			<Paper
				sx={{ flex: 1, display: 'flex', overflowY: 'auto' }}
				shadow="md"
				m="xl"
				withBorder
			>
				<Prism
					language="markdown"
					withLineNumbers
					sx={{ width: '100%', height: '100%' }}
				>
					{chunks
						.map((chunk, index) => `Chunk [${index}]\n${chunk}\n`)
						.join('')}
				</Prism>
			</Paper>
		</Modal>
	);
};
