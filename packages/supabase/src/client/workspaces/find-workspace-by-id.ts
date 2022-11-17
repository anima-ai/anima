import { showNotification } from '@mantine/notifications';
import { Workspace } from '@anima/core';

import { supabase } from '../client';

export const findById = async (id: number): Promise<Workspace> => {
	const { data, error } = await supabase
		.from('workspaces')
		.select(
			`*, flows(*, prompt_nodes(*), input_nodes(*), comment_nodes(*), edges(*), output_nodes(*)))`,
		)
		.eq('id', id)
		.single();

	if (error) {
		showNotification({
			title: 'Error fetching workspace',
			message: error.message,
			color: 'red',
		});
	}
	// TODO: Remove this when we have a better way to handle this
	// @ts-ignore
	return data;
};
