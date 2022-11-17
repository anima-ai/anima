import { Textarea } from '@mantine/core';
import { FC, useState } from 'react';
import useDebouncedEffect from 'use-debounced-effect';

import { nodesMap } from '@anima/core';

import { promptNodes } from '@anima/supabase';
import { useNode } from '../../../hooks';

interface Props {
	nodeId: string;
}

export const PromptDescription: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);
	const [description, setDescription] = useState(node?.data?.description || '');

	useDebouncedEffect(
		() => {
			nodesMap.get(nodeId)!.data.description = description;
			promptNodes.update(nodeId, { description });
		},
		600,
		[description],
	);

	return (
		<Textarea
			onChange={a => setDescription(a.currentTarget.value)}
			value={description ?? node.data?.description}
			styles={{ input: { height: '100px' } }}
			label="Prompt Description"
		/>
	);
};
