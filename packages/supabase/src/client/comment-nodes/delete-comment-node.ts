import { showNotification } from '@mantine/notifications';
import { getRowId } from '../../utils';
import { supabase } from '../client';

export const _delete = async (id: number | string) => {
	const _id = getRowId(id);

	const { error } = await supabase.from('comment_nodes').delete().eq('id', _id);

	if (error) {
		showNotification({
			title: 'Error deleting comment',
			message: error.message,
			color: 'red',
		});
	}
};
