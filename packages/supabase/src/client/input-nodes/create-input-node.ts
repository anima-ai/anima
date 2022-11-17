import { showNotification } from '@mantine/notifications';
import { supabase } from '../client';

export const create = async (flow_id: number) => {
	const { error } = await supabase.from('input_nodes').insert({
		flow_id: flow_id,
	});

	if (error) {
		showNotification({
			message: error.message,
			title: 'Error createing input node',
			color: 'red',
		});
		throw error;
	}
};
