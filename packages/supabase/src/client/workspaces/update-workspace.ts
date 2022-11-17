import { showNotification } from '@mantine/notifications';
import { Database } from '@anima/core/types/db_types';

import { supabase } from '../client';

export const update = async (
	id: number,
	updates: Database['public']['Tables']['workspaces']['Update'],
) => {
	const { error } = await supabase
		.from('workspaces')
		.update(updates)
		.eq('id', id);

	if (error) {
		showNotification({
			title: 'Error updating workspace',
			message: error.message,
			color: 'red',
		});
	}
};
