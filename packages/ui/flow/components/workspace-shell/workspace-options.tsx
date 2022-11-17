import { ActionIcon, Box, Menu, Switch, Tooltip } from '@mantine/core';
import { workspaceProxy } from '@anima/core';
import { workspaces } from '@anima/supabase';
import { IconDots } from '@tabler/icons';
import { useCallback } from 'react';
import { useSnapshot } from 'valtio';

const WorkspacePublicitySwitch = () => {
	const { is_public, id } = useSnapshot(workspaceProxy);

	const onChange = useCallback(
		(value: boolean) => {
			workspaceProxy.is_public = value;
			workspaces.update(id, {
				is_public: value,
			});
		},
		[id],
	);

	return (
		<Switch
			size="md"
			label={is_public ? 'Public' : 'Private'}
			checked={is_public}
			onChange={e => onChange(e.currentTarget.checked)}
		/>
	);
};

export const WorkspaceOptions = () => {
	return (
		<Menu>
			<Menu.Target>
				<ActionIcon>
					<IconDots />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Box py="xs" px="sm">
					<Tooltip
						position="left"
						withArrow
						label="If set the workspace will be made public"
					>
						<div>
							<WorkspacePublicitySwitch />
						</div>
					</Tooltip>
				</Box>
			</Menu.Dropdown>
		</Menu>
	);
};
