import { showNotification } from '@mantine/notifications';
import { NodeType } from '@anima/core';
import { supabase } from '../client';
import { flows } from '../flows';
import { findById } from './find-workspace-by-id';

export const fork = async (id: number) => {
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

	const { flows: wsFlows, title, description } = await findById(id);

	const { data, error } = await supabase
		.from('workspaces')
		.insert({
			owner_id: userId!,
			title: title,
			description: description,
		})
		.select()
		.single();

	const newWorkspaceId = data?.id;

	for (let i = 0; i < wsFlows.length; i++) {
		const flow = wsFlows[i];
		const { flowId, inputId } = await flows.create(newWorkspaceId!);

		for (let j = 0; j < flow.comment_nodes.length; j++) {
			const { contents, position } = flow.comment_nodes[j];

			await supabase.from('comment_nodes').insert({
				flow_id: flowId,
				contents,
				position,
			});
		}

		const promptsMapper: Record<number, number> = {};

		for (let j = 0; j < flow.prompt_nodes.length; j++) {
			const { created_at, flow_id, id, result, updated_at, ...rest } =
				flow.prompt_nodes[j];

			const { data, error } = await supabase
				.from('prompt_nodes')
				.insert({
					flow_id: flowId,
					...rest,
				})
				.select('id')
				.single();

			if (error) throw error;

			promptsMapper[id] = data.id;
		}

		for (let j = 0; j < flow.edges.length; j++) {
			const { source, source_type, target, target_type } = flow.edges[j];

			// don't duplicate output node for now
			if (source_type === NodeType.OUTPUT || target_type === NodeType.OUTPUT) {
				continue;
			}

			const _source =
				source_type == NodeType.PROMPT ? promptsMapper[source] : inputId;
			const _target =
				target_type == NodeType.PROMPT ? promptsMapper[target] : inputId;

			await supabase.from('edges').insert({
				flow_id: flowId,
				source: _source,
				source_type,
				target: _target,
				target_type,
			});
		}
	}
	return newWorkspaceId;
};
