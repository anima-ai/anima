import { InputNode } from '../../../types';
import { inputProxy } from '../../input-proxy';

export const resetInput = (data: InputNode) => {
	inputProxy.id = data.id;
	inputProxy.label = data.label;
	inputProxy.file = data.file;

	inputProxy.chunk_id = -1;
	inputProxy.chunk_data = '';
	inputProxy.chunks = [];

	inputProxy.chunking_type = data.chunking_type;
	inputProxy.chunk_overlap = data.chunk_overlap;
	inputProxy.chunk_size = data.chunk_size;
	inputProxy.chunk_pattern = data.chunk_pattern;
};
