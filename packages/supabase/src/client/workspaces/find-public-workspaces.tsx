import { showNotification } from '@mantine/notifications';

import { supabase } from '../client';

export const findPublic = async () => {
	const { data, error } = await supabase
		.from('workspaces')
		.select(`*, users(*)`, { count: 'exact' })
		.eq('is_public', true);

	if (error) {
		showNotification({
			title: 'Error fetching public workspaces',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
