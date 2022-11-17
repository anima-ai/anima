import { UnstyledButton, Stack, Text, Group } from '@mantine/core';
import { WorkspaceFilterType, workspacesProxy } from '@anima/core';
import { Fragment } from 'react';
import { useSnapshot } from 'valtio';

interface SideMenuButtonProps {
	label: string;
	count: number;
	onClick: () => void;
	active: boolean;
}

const SideMenuButton = ({
	label,
	count,
	onClick,
	active,
}: SideMenuButtonProps) => {
	return (
		<UnstyledButton
			onClick={onClick}
			style={{ paddingBlock: '6px' }}
			sx={theme => ({
				borderWidth: 0,
				borderRadius: '8px',
				backgroundColor: active ? theme.colors.gray[1] : 'white',
				paddingInline: '12px',
			})}
			py="2px"
		>
			<Group position="apart">
				<Text size="sm">{label}</Text>
				<Text size="sm">{count}</Text>
			</Group>
		</UnstyledButton>
	);
};

export const SideMenu = () => {
	const workspaces = useSnapshot(workspacesProxy);

	const items = [
		{
			label: WorkspaceFilterType.all,
			count: workspaces.all.length,
			active: workspaces.selected === WorkspaceFilterType.all,
		},
		{
			label: WorkspaceFilterType.favorite,
			count: workspaces.favorite.length,
			active: workspaces.selected === WorkspaceFilterType.favorite,
		},
		{
			label: WorkspaceFilterType.private,
			count: workspaces.private.length,
			active: workspaces.selected === WorkspaceFilterType.private,
		},
		{
			label: WorkspaceFilterType.public,
			count: workspaces.public.length,
			active: workspaces.selected === WorkspaceFilterType.public,
		},
	];

	return (
		<Stack spacing="xs">
			{items.map((item, index) => (
				<Fragment key={`side-menu-item-${index}`}>
					<SideMenuButton
						label={item.label}
						count={item.count}
						active={item.active ?? false}
						onClick={() => {
							workspacesProxy.selected = item.label;
							switch (item.label) {
								case WorkspaceFilterType.all:
									// @ts-ignore
									workspacesProxy.filtered = [...workspaces.all];
									break;
								case WorkspaceFilterType.favorite:
									// @ts-ignore
									workspacesProxy.filtered = [...workspaces.favorite];
									break;
								case WorkspaceFilterType.private:
									// @ts-ignore
									workspacesProxy.filtered = [...workspaces.private];
									break;
								case WorkspaceFilterType.public:
									// @ts-ignore
									workspacesProxy.filtered = [...workspaces.public];
									break;
							}
						}}
					/>
				</Fragment>
			))}
		</Stack>
	);
};
