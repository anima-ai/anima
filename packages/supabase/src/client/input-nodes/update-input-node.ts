import { showNotification } from '@mantine/notifications';
import { Database } from '@anima/core/types/db_types';

import { getRowId } from '../../utils';
import { supabase } from '../client';

export const update = async (
	id: number | string,
	updates: Database['public']['Tables']['input_nodes']['Update'],
) => {
	const { data, error } = await supabase
		.from('input_nodes')
		.update(updates)
		.eq('id', getRowId(id));

	if (error) {
		showNotification({
			title: 'Error updating input',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
