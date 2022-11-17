import { FC, useEffect, useRef, useState } from 'react';
import { RichTextEditor, Editor } from '@mantine/rte';

import { useNode, useParseMentions } from '../../hooks';

interface Props {
	nodeId: string;
}
const QueryUpdater: FC<Props> = ({ nodeId }) => {
	const { onUpdateQuery, node } = useNode(nodeId);
	const [preview, setPreview] = useState<any>('');
	const ref = useRef<Editor>(null);
	const parseMentions = useParseMentions();

	useEffect(() => {
		setPreview(parseMentions(node.data.contents));
	}, [node.data.contents, onUpdateQuery, node.data.timestamp, parseMentions]);

	useEffect(() => {
		if (ref.current?.editor) {
			onUpdateQuery(ref.current.editor.getText());
		}
	}, [preview, onUpdateQuery]);

	return (
		<RichTextEditor
			hidden
			ref={ref}
			onChange={() => {}}
			value={preview}
			readOnly
			controls={[]}
		/>
	);
};

export default QueryUpdater;
