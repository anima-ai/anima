/* eslint-disable valtio/state-snapshot-rule */
import { TextInput } from '@mantine/core';
import { outputProxy } from '@anima/core';
import { outputNodes } from '@anima/supabase';
import useDebouncedEffect from 'use-debounced-effect';
import { useSnapshot } from 'valtio';

export const WebhookUrlInput = () => {
	const { webhook_url, id } = useSnapshot(outputProxy);

	useDebouncedEffect(
		() => {
			outputNodes.update(id, { webhook_url });
		},
		{ timeout: 1000, ignoreInitialCall: true },
		[webhook_url],
	);

	return (
		<TextInput
			sx={{ width: 450 }}
			label="Webhook URL"
			placeholder="webhook url e.g https://webhook.site/..."
			value={webhook_url}
			onChange={e => (outputProxy.webhook_url = e.currentTarget.value)}
		/>
	);
};
