import { proxy } from 'valtio';
import { Workspace, WorkspaceFilterType } from '../types';

export const workspacesProxy = proxy<{
	all: Workspace[];
	favorite: Workspace[];
	private: Workspace[];
	public: Workspace[];
	filtered: Workspace[];
	selected: WorkspaceFilterType;
}>({
	all: [],
	favorite: [],
	private: [],
	public: [],
	filtered: [],
	selected: WorkspaceFilterType.all,
});
