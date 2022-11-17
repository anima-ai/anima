import { useMemo } from 'react';
import { snapshot } from 'valtio';

import { nodesMap, getAncestors } from '@anima/core';

export const useMentions = (nodeId: string): [any, any[]] => {
	const tags = useMemo(() => {
		const ancestors = getAncestors(nodeId);

		return ancestors.map(node => {
			const value = snapshot(nodesMap).get(node)?.data.label || 'None';

			return {
				id: node,
				value: value,
				denotationChar: '',
			};
		});
	}, [nodeId]);

	const mentions = useMemo(
		() => ({
			color: 'red',
			allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
			mentionDenotationChars: ['>>'],
			source: (searchTerm: any, renderList: any, mentionChar: any) => {
				const includesSearchTerm = tags
					.filter(item =>
						item.value.toLowerCase().includes(searchTerm.toLowerCase()),
					)
					.map(item => ({ ...item, value: item.value }));

				renderList(includesSearchTerm);
			},
			dataAttributes: ['id', 'data'],
		}),
		[tags],
	);

	return [mentions, tags];
};
