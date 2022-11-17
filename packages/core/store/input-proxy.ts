import { proxy, snapshot } from 'valtio';
import { ChunkingType, InputNode } from '../types';

type ChunksSettings = {
	chunks: string[];
	chunk_id: number;
	chunk_data: string;
};

export const inputProxy = proxy<InputNode & ChunksSettings>({
	id: 0,
	label: 'Input',
	chunk_overlap: 0,
	chunk_pattern: '',
	chunk_size: 100,
	chunking_type: ChunkingType.TOKENS,
	created_at: new Date().toLocaleString(),
	file: null,
	position: {
		x: 0,
		y: 0,
	},
	flow_id: null,

	chunk_data: '',
	chunk_id: 0,
	chunks: [],
});

export const setChunksSize = (_size: number) => {
	const { chunk_size } = snapshot(inputProxy);
	let size = 64;
	if (!_size) {
		size = chunk_size;
	} else {
		size = _size;
	}

	inputProxy.chunk_size = size;
};

export const setChunkId = (id: number) => {
	const { chunks } = snapshot(inputProxy);

	if (chunks.length <= id) return;

	inputProxy.chunk_id = id;
	inputProxy.chunk_data = chunks[id];
};

export const setInputFile = async (file: string) => {
	inputProxy.file = file;
};

export const setChunkOverlap = async (val: number) => {
	const { chunk_size } = snapshot(inputProxy);
	let _val = val;

	if (val < 0) _val = 0;
	if (val >= chunk_size) _val = chunk_size - 1;

	inputProxy.chunk_overlap = _val;
};
