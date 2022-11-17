import { FC, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedValue } from '@mantine/hooks';
import { Box } from '@mantine/core';

import { NodeType } from '@anima/core';
import { useNode, useMentions } from '../../hooks';
import useQuillParser from '../../hooks/use-quill-pareser';
import RichTextEditor from '../quill';
import { VariablesList } from './variables-list';

interface Props {
	nodeId: string;
}

export const OutputEditor: FC<Props> = ({ nodeId }) => {
	const { node, onUpdateEditorContents } = useNode(nodeId);
	const [contents, setQuill, resetQuill] = useQuillParser(state => [
		state.contents,
		state.setQuill,
		state.resetQuill,
	]);
	const [debouncedContents] = useDebouncedValue(contents, 250);

	useEffect(() => {
		resetQuill(node.data.contents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nodeId]);

	useEffect(() => {
		onUpdateEditorContents(debouncedContents, NodeType.OUTPUT);
	}, [onUpdateEditorContents, debouncedContents]);

	const [mentions] = useMentions(nodeId);

	const onQuillChange = useCallback<(...any: any) => any>(
		(value, delta, sources, editor) => {
			if (sources === 'user') {
				setQuill(editor.getContents());
			}
		},
		[setQuill],
	);

	return (
		<Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
			<RichTextEditor
				sx={theme => ({
					'& .mention': {
						display: 'inline-block',
						color:
							theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[4]
								: theme.colors.gray[2],
						padding: '3px 5px',
						marginRight: 2,
						borderRadius: theme.radius.sm,
						userSelect: 'all',
						pointerEvents: 'none',
					},

					fontFamily: 'JetBrains Mono',
					zIndex: 1,
					border: '0px',
					overflowY: 'auto',
					width: '100%',
					height: '100%',
				})}
				value={contents}
				onChange={onQuillChange}
				mentions={mentions}
				styles={{
					toolbar: { display: 'none' },
					root: { minHeight: '600px' },
				}}
				controls={[]}
			/>
			<VariablesList nodeId={nodeId} />
		</Box>
	);
};

export default dynamic(() => Promise.resolve(OutputEditor), {
	ssr: false,
});
