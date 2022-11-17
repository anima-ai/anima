import { useQuery } from '@tanstack/react-query';
import { snapshot } from 'valtio';

import { QueryKey } from '@anima/constants';
import { workspaces } from '@anima/supabase';
import { WorkspaceFilterType, workspacesProxy } from '@anima/core';

export const useWorkpacesQuery = () => {
	const { data, isLoading } = useQuery(
		[QueryKey.Workspaces],
		() => workspaces.findAll(),
		{
			onSuccess: data => {
				const privateWorkspaces =
					(data?.filter(workspace => !workspace.is_public) as any) || [];
				const favoriteWorkspaces =
					(data?.filter(workspace => workspace.is_favorite) as any) || [];

				workspacesProxy.all = (data as any) || [];
				workspacesProxy.favorite = favoriteWorkspaces;
				workspacesProxy.private = privateWorkspaces;

				const workspacesSnapshot = snapshot(workspacesProxy);
				switch (workspacesSnapshot.selected) {
					case WorkspaceFilterType.all:
						workspacesProxy.filtered = data as any;
						break;
					case WorkspaceFilterType.favorite:
						workspacesProxy.filtered = favoriteWorkspaces;
						break;
					case WorkspaceFilterType.private:
						workspacesProxy.filtered = privateWorkspaces;
						break;
				}
			},
		},
	);

	useQuery([QueryKey.Workspaces_Public], () => workspaces.findPublic(), {
		onSuccess: data => {
			const publicWorkspaces =
				(data?.filter(workspace => workspace.is_public) as any) || [];

			workspacesProxy.public = publicWorkspaces;
		},
	});

	return { data, isLoading };
};
