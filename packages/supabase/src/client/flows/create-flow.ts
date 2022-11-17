import { showNotification } from '@mantine/notifications';
import { supabase } from '../client';

export const create = async (workspace_id: number) => {
	const { data, error } = await supabase
		.from('flows')
		.upsert({
			workspace_id: workspace_id,
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
	const { data: data2, error: error2 } = await supabase
		.from('input_nodes')
		.insert({
			flow_id: data.id,
		})
		.select('id')
		.single();

	if (error2) {
		showNotification({
			message: error2.message,
			title: 'Error',
			color: 'red',
		});
		throw error2;
	}

	return { flowId: data.id, inputId: data2.id };
};
