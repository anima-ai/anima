import { FC, memo, useRef, useState } from 'react';
import { useEditor, EditorContent, PureEditorContent } from '@tiptap/react';
import { getHotkeyHandler } from '@mantine/hooks';
import { useDebouncedCallback } from 'use-debounce';
import StarterKit from '@tiptap/starter-kit';
import { Paper } from '@mantine/core';

import './styles.css';
import { useNode } from '../../../hooks/use-node';

interface Props {
	id: string;
}
const CommentNode: FC<Props> = memo(({ id }) => {
	const { onUpdateEditorContents, node, onDelete } = useNode(id);
	const ref = useRef<PureEditorContent>(null);
	const [focus, setFocus] = useState(false);

	const extraStyles = focus
		? {
				backgroundColor: 'white',
				outline: '1px solid',
				outlineColor: 'gray',
		  }
		: {};

	const onChange = useDebouncedCallback((val: any) => {
		onUpdateEditorContents(val, node.type as any);
	}, 1000);

	const editor = useEditor({
		extensions: [StarterKit],
		editorProps: {},
		onUpdate: ({ editor }) => {
			onChange(editor.getJSON());
		},
		onCreate: ({ editor }) => {
			onChange(editor.getJSON());
		},
		autofocus: true,
		onFocus: () => {
			setFocus(true);
		},
		onBlur: () => {
			setFocus(false);
		},
		content: node?.data?.contents
			? node.data.contents.ops
				? 'Comment...'
				: node.data.contents
			: 'Comment...',
	});

	return (
		<Paper
			pt="1px"
			radius="md"
			sx={{
				':hover': {
					backgroundColor: 'white',
					outline: '1px solid',
					outlineColor: 'gray',
				},
				backgroundColor: 'transparent',
				...extraStyles,
			}}
		>
			<EditorContent
				style={{ minWidth: '40px' }}
				ref={ref}
				onKeyDown={getHotkeyHandler([['mod+shift+D', onDelete]])}
				editor={editor}
			/>
		</Paper>
	);
});

export default CommentNode;
