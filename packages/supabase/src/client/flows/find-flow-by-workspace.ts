import { showNotification } from '@mantine/notifications';

import { supabase } from '../client';

export const findByWorkspace = async (workspaceId: string) => {
	const { data, error } = await supabase
		.from('flows')
		.select(`*, prompt_nodes(*)`)
		.eq('workspace_id', workspaceId)
		.single();

	if (error) {
		showNotification({
			title: 'Error fetching flows',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
