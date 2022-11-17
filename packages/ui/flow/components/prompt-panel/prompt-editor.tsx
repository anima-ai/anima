import dynamic from 'next/dynamic';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

import { Box } from '@mantine/core';
import { useActionSheet } from '@anima/core';
import { useNode, useParseMentions, useMentions } from '../../hooks';
import useQuillParser from '../../hooks/use-quill-pareser';
import RichTextEditor from '../quill';
import { VariablesList } from './variables-list';

interface Props {
	nodeId: string;
}

export const PromptEditor: FC<Props> = ({ nodeId }) => {
	const { node, onUpdateEditorContents } = useNode(nodeId);
	const [contents, setQuill, resetQuill] = useQuillParser(state => [
		state.contents,
		state.setQuill,
		state.resetQuill,
	]);
	const [debouncedContents] = useDebouncedValue(contents, 250);
	const parseMentions = useParseMentions();

	const readOnly = useActionSheet(state => state.readOnly);

	useEffect(() => {
		resetQuill(node.data.contents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nodeId]);

	useEffect(() => {
		onUpdateEditorContents(debouncedContents);
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

	const editorValue = useMemo(() => {
		if (readOnly) {
			return parseMentions(contents);
		}
		return contents;
	}, [parseMentions, readOnly, contents]);

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
				value={editorValue}
				onChange={onQuillChange}
				mentions={mentions}
				styles={{
					toolbar: { display: 'none' },
					root: { minHeight: '600px' },
				}}
				readOnly={readOnly}
				controls={[]}
			/>
			<VariablesList nodeId={nodeId} />
		</Box>
	);
};

export default dynamic(() => Promise.resolve(PromptEditor), {
	ssr: false,
});
