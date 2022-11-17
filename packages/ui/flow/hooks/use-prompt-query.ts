import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'ramda';
import { useSnapshot } from 'valtio';

import { getPrompt } from '@anima/api';
import { inputProxy } from '@anima/core';

import { promptNodes } from '@anima/supabase';
import { useNode } from './use-node';

export const usePromptQuery = (nodeId: string) => {
	const { node, onUpdateResult, forceUpdateSuccessor } = useNode(nodeId);
	const [timestamp, setTimestamp] = useState(node?.data?.timestamp);
	const { chunks } = useSnapshot(inputProxy);

	const { query } = useMemo(
		() => ({
			query: node?.data.query || '',
		}),
		[node?.data.query],
	);

	const [queryKey] = useState(`prompt-${nodeId}`);

	const { refetch, isFetching, data } = useQuery(
		[queryKey],
		({ signal }) =>
			getPrompt(
				{ prompt: query, settings: node?.data.settings },
				{
					type: node.data.chunksHandlerType,
					chunksRange: node.data.chunksRange,
					chunks: chunks as string[],
					contents: node.data.contents,
				},
				{ signal },
			),
		{
			enabled: false,
		},
	);

	const queryClient = useQueryClient();

	const onExecute = useCallback(async () => {
		const result = await refetch();
		const val = result.data?.text || '';

		promptNodes.update(nodeId, { result: val });

		if (val) {
			onUpdateResult(val);
		}
	}, [refetch]);

	const onExecuteChain = useCallback(async () => {
		const result = await refetch();
		const val = result.data?.text || '';

		promptNodes.update(nodeId, { result: val });

		if (val) {
			onUpdateResult(val);
			forceUpdateSuccessor();
		}
	}, [refetch, forceUpdateSuccessor]);

	const onCancelRequest = useCallback(() => {
		queryClient.cancelQueries([queryKey]);
	}, [queryKey, queryClient]);

	useEffect(() => {
		if (timestamp !== node?.data.timestamp) {
			setTimestamp(node?.data.timestamp as any);
			setTimeout(async () => {
				if (isEmpty(query.trim())) return;
				await onExecuteChain();
			}, 700);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timestamp, node?.data?.timestamp, onExecuteChain]);

	return {
		onExecute,
		onExecuteChain,
		onCancelRequest,
		isFetching,
		apiResult: data,
	};
};
