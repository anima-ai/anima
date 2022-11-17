import { showNotification } from '@mantine/notifications';
import { Database } from '@anima/core/types/db_types';

import { getRowId } from '../../utils';
import { supabase } from '../client';

export const update = async (
	id: number | string,
	updates: Database['public']['Tables']['output_nodes']['Update'],
) => {
	const _id = getRowId(id);

	const { error } = await supabase
		.from('output_nodes')
		.update(updates)
		.eq('id', _id);

	if (error) {
		showNotification({
			title: 'Error updating output',
			message: error.message,
			color: 'red',
		});
	}
};
