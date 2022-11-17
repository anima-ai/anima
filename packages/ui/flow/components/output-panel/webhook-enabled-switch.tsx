/* eslint-disable valtio/state-snapshot-rule */
import { Switch } from '@mantine/core';
import { outputProxy } from '@anima/core';
import { outputNodes } from '@anima/supabase';
import useDebouncedEffect from 'use-debounced-effect';
import { useSnapshot } from 'valtio';

export const WebhookEnabledSwitch = () => {
	const { enabled, id } = useSnapshot(outputProxy);

	useDebouncedEffect(
		() => {
			outputNodes.update(id, { enabled });
		},
		{ timeout: 1000, ignoreInitialCall: true },
		[enabled],
	);

	return (
		<Switch
			size="md"
			label="Enabled"
			onChange={e => (outputProxy.enabled = e.currentTarget.checked)}
			checked={enabled}
		/>
	);
};
