import { showNotification } from '@mantine/notifications';

import { supabase } from '../client';

export const findPrivate = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from('workspaces')
		.select(`*, users(*)`, { count: 'exact' })
		.eq('owner_id', user!.id)
		.eq('is_public', false);

	if (error) {
		showNotification({
			title: 'Error fetching private workspaces',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
