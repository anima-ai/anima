import useDebouncedEffect from 'use-debounced-effect';
import { useCallback } from 'react';

import { promptNodes } from '@anima/supabase';
import { useNode } from '../../../hooks';

export const useSaveSettings = (nodeId: string) => {
	const { node } = useNode(nodeId);

	const settings = node.data.settings;

	const onSave = useCallback(async () => {
		promptNodes.update(nodeId, { settings });
	}, [nodeId, settings]);

	useDebouncedEffect(
		() => {
			onSave();
		},
		300,
		[onSave, settings],
	);
};
