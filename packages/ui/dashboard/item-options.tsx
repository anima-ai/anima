import { ActionIcon, Divider, Menu, useMantineTheme } from '@mantine/core';
import { QueryKey } from '@anima/constants';
import { ROUTES } from '@anima/core';
import { workspaces } from '@anima/supabase';
import { IconDotsVertical, IconEdit, IconGitFork } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';

interface Props {
	id: number;
}

export const ItemOptions: FC<Props> = ({ id }) => {
	const { push } = useRouter();
	const { colors } = useMantineTheme();

	const queryClient = useQueryClient();
	const { mutate, isLoading } = useMutation(
		() => {
			return workspaces.fork(id);
		},
		{
			onSuccess: id => {
				queryClient.invalidateQueries([QueryKey.Workspaces]);
				setTimeout(() => {
					push(`${ROUTES.workspace}/${id ?? ''}`);
				}, 500);
			},
		},
	);

	const onOpen = useCallback(() => {
		push(`${ROUTES.workspace}/${id}`);
	}, [id, push]);

	const onFork = useCallback(() => {
		mutate();
	}, [mutate]);

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon>
					<IconDotsVertical />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item icon={<IconEdit color={colors.gray[7]} />} onClick={onOpen}>
					Edit
				</Menu.Item>
				<Divider />
				<Menu.Item
					icon={<IconGitFork color={colors.gray[7]} />}
					onClick={onFork}
				>
					Fork
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
