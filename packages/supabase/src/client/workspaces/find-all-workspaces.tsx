import { showNotification } from '@mantine/notifications';

import { supabase } from '../client';

export const findAll = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from('workspaces')
		.select(`*, owner:users(*)`, { count: 'exact' })
		.eq('owner_id', user!.id);

	if (error) {
		showNotification({
			title: 'Error fetching workspaces',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
