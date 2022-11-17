import { showNotification } from '@mantine/notifications';
import { NodeType } from '@anima/core';
import { getRowId } from '../../utils';
import { supabase } from '../client';

export const create = async (
	flow_id: number,
	source: number | string,
	target: number | string,
	source_type: any = NodeType.PROMPT,
	target_type: any = NodeType.PROMPT,
) => {
	const { data, error } = await supabase
		.from('edges')
		.insert({
			flow_id: flow_id,
			source: getRowId(source),
			target: getRowId(target),
			source_type,
			target_type,
		})
		.select()
		.single();

	if (error) {
		showNotification({
			message: error.message,
			title: 'Error creating edge',
			color: 'red',
		});
	}
	return data?.id;
};
