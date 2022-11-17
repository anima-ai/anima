/* eslint-disable no-empty-pattern */
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';

import { PromptPanel, OutputPanel, Flow, WorkspaceShell } from '@anima/ui';
import { QueryKey } from '@anima/constants';
import { useQuery } from '@tanstack/react-query';
import { workspaces } from '@anima/supabase';
import { resetWorkspace } from '@anima/core';

export default function Workspace({}) {
	const { query } = useRouter();

	const { isFetching, refetch } = useQuery(
		[QueryKey.Workspaces],
		() => workspaces.findById(Number(query.id)),
		{
			enabled: !!query?.id,
			onSuccess: data => {
				if (data.flows) {
					resetWorkspace(data);
				} else {
					refetch();
				}
			},
			refetchOnWindowFocus: false,
		},
	);

	return (
		<WorkspaceShell>
			<LoadingOverlay visible={isFetching} />
			<Flow />
			<PromptPanel />
			<OutputPanel />
		</WorkspaceShell>
	);
}

Workspace.auth = true;
