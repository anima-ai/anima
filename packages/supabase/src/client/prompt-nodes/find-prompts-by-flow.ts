import { showNotification } from '@mantine/notifications';
import { supabase } from '../client';

export const findByFlow = async (flowId: string) => {
	const { data, error } = await supabase
		.from('prompt_nodes')
		.select(`*`)
		.eq('flow_id', flowId);

	if (error) {
		showNotification({
			title: 'Error fetching prompts',
			message: error.message,
			color: 'red',
		});
	} else {
		return data;
	}
};
