import { FC } from 'react';
import { Prism } from '@mantine/prism';

import { useNode } from '../../hooks';

interface Props {
	nodeId: string;
}

const PromptResult: FC<Props> = ({ nodeId }) => {
	const { node } = useNode(nodeId);
	const result = node?.data.result;

	if (!node?.data) {
		return null;
	}

	return (
		<Prism
			language="markdown"
			sx={{
				width: '100%',
				height: '100%',
				maxHeight: '75vh',
				backgroundColor: '#FAFBFB',
				paddingLeft: '8px',
				overflowY: 'auto',
			}}
			styles={{
				code: { minHeight: '600px', whiteSpace: 'pre-wrap' },
			}}
		>
			{result}
		</Prism>
	);
};

export default PromptResult;
