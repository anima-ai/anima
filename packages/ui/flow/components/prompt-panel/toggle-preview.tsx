import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMist, IconMistOff } from '@tabler/icons';
import { useActionSheet } from '@anima/core';
import { FC } from 'react';

export const TogglePreview: FC = () => {
	const [toggled, toggleReadOnly] = useActionSheet(state => [
		state.readOnly,
		state.toggleReadOnly,
	]);

	return (
		<Tooltip label="Toggle Preview">
			<ActionIcon variant="light" size="lg" p="4px" onClick={toggleReadOnly}>
				{toggled ? <IconMist size="md" /> : <IconMistOff size="md" />}
			</ActionIcon>
		</Tooltip>
	);
};
