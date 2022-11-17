import { showNotification } from '@mantine/notifications';
import { supabase } from '../client';
import { flows } from '../flows';

export const create = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const userId = user?.id;

	if (!userId) {
		showNotification({
			message: 'You must be logged in to create a workspace',
			title: 'Error',
			color: 'red',
		});
	}

	const { data, error } = await supabase
		.from('workspaces')
		.insert({
			owner_id: userId!,
			title: 'Untitled',
		})
		.select()
		.single();

	if (error) {
		showNotification({
			message: error.message,
			title: 'Error',
			color: 'red',
		});
		throw error;
	}

	await flows.create(data.id);

	return data;
};
