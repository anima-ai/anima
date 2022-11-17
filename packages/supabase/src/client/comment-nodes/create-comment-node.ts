import { showNotification } from '@mantine/notifications';
import { Position } from '@anima/core';
import { supabase } from '../client';

export const create = async (flow_id: number, position: Position) => {
	const { data, error } = await supabase
		.from('comment_nodes')
		.insert({
			flow_id: flow_id,
			position,
		})
		.select()
		.single();

	if (error) {
		showNotification({
			title: 'Error creating comment',
			message: error.message,
			color: 'red',
		});
		return {} as any;
	} else {
		return data;
	}
};
