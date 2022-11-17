import { showNotification } from '@mantine/notifications';
import { getRowId } from '../../utils';
import { supabase } from '../client';

export const _delete = async (id: string | number) => {
	const _id = getRowId(id);
	const { error } = await supabase.from('edges').delete().eq('id', _id);

	if (error) {
		showNotification({
			message: error.message,
			title: 'Error deleting edge',
			color: 'red',
		});
		throw error;
	}
};
