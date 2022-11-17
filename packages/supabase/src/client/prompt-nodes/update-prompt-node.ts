import { showNotification } from '@mantine/notifications';
import { Database } from '@anima/core/types/db_types';
import { getRowId } from '../../utils';
import { supabase } from '../client';

export const update = async (
	id: number | string,
	updates: Database['public']['Tables']['prompt_nodes']['Update'],
) => {
	const _id = getRowId(id);

	const { error } = await supabase
		.from('prompt_nodes')
		.update(updates)
		.eq('id', _id);

	if (error) {
		showNotification({
			title: 'Error updating prompts',
			message: error.message,
			color: 'red',
		});
	}
};
