import { useCallback } from 'react';
import create from 'zustand';

import { inputProxy, nodesMap, NodeType } from '@anima/core';
import { snapshot, useSnapshot } from 'valtio';

type State = {
	contents: { ops: any[] };
	setQuill: (contents: any) => void;
	resetQuill: (contents: any) => void;
};

export const useParseMentions = () => {
	const { chunk_data } = useSnapshot(inputProxy);

	const parseMentions = useCallback(
		(contents: { ops: any[] }) => {
			return {
				...contents,
				ops: contents.ops!.map(op => {
					const getInsert = (insert: any) => {
						if (insert?.mention) {
							const node = snapshot(nodesMap).get(insert.mention.id);

							if (!node) return '';

							return node.type === NodeType.INPUT
								? chunk_data
								: node.data.result || '';
						}
						return insert;
					};

					const _op: typeof op = {
						...op,
						insert: getInsert(op.insert),
					};

					return _op;
				}),
			};
		},
		[chunk_data],
	);

	return parseMentions;
};

export const parseMentions = (contents: { ops: any[] }) => {
	return {
		...contents,
		ops: contents.ops!.map(op => {
			const getInsert = (insert: any) => {
				if (insert?.mention) {
					const node = snapshot(nodesMap).get(insert.mention.id);

					if (!node) return '';

					return node.type === NodeType.INPUT
						? node.data.query
						: node.data.result || '';
				}
				return insert;
			};

			const _op: typeof op = {
				...op,
				insert: getInsert(op.insert),
			};

			return _op;
		}),
	};
};

const useQuillParser = create<State>((set, get) => ({
	contents: { ops: [] },
	setQuill: contents => {
		set({
			contents,
		});
	},
	resetQuill: contents => {
		set({
			contents,
		});
	},
}));

export { useQuillParser as default, useQuillParser };
