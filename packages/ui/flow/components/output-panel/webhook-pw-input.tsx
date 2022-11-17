/* eslint-disable valtio/state-snapshot-rule */
import { PasswordInput } from '@mantine/core';
import { outputProxy } from '@anima/core';
import { outputNodes } from '@anima/supabase';
import useDebouncedEffect from 'use-debounced-effect';
import { useSnapshot } from 'valtio';

export const WebhookPWInput = () => {
	const { password, id } = useSnapshot(outputProxy);

	useDebouncedEffect(
		() => {
			outputNodes.update(id, { password });
		},
		{ timeout: 1000, ignoreInitialCall: true },
		[password],
	);

	return (
		<PasswordInput
			sx={{ width: 450 }}
			label="Webhook Password"
			description="Password for webhook"
			value={password || ''}
			onChange={e => (outputProxy.password = e.currentTarget.value)}
		/>
	);
};
