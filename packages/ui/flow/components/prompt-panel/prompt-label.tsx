import { TextInput } from '@mantine/core';
import { promptNodes } from '@anima/supabase';
import { FC, useState } from 'react';
import useDebouncedEffect from 'use-debounced-effect';

import { useNode } from '../../hooks';

interface Props {
	nodeId: string;
}

export const PromptLabel: FC<Props> = ({ nodeId }) => {
	const { node, onUpdateNodeLabel } = useNode(nodeId);
	const [name, setName] = useState(node?.data?.label || '');

	useDebouncedEffect(
		() => {
			onUpdateNodeLabel(name);
			promptNodes.update(nodeId, { label: name });
		},
		600,
		[name],
	);

	return (
		<TextInput
			variant="filled"
			onChange={a => setName(a.currentTarget.value)}
			value={name}
			styles={{
				input: { fontSize: '16px', fontWeight: 'bold', width: '320px' },
			}}
		/>
	);
};
