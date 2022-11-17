import { showNotification } from '@mantine/notifications';

import { supabase } from '../client';

export const findFavorite = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from('workspaces')
		.select(`*, users(*)`, { count: 'exact' })
		.eq('owner_id', user!.id)
		.eq('is_favorite', true);

	if (error) {
		showNotification({
			title: 'Error fetching favorite workspaces',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
