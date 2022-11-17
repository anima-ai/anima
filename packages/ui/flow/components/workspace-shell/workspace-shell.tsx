import { FC, PropsWithChildren, useCallback } from 'react';
import { IconAperture } from '@tabler/icons';
import { useSnapshot } from 'valtio';
import { AppShell, Group, Header, TextInput } from '@mantine/core';
import Link from 'next/link';

import { ROUTES, workspaceProxy } from '@anima/core';
import { workspaces } from '@anima/supabase';
import { useDebouncedCallback } from 'use-debounce';
import { WorkspaceOptions } from './workspace-options';

const HEADER_HEIGHT = 60;

const WorkspaceTitle = () => {
	const { title, id } = useSnapshot(workspaceProxy);

	const updateApi = useDebouncedCallback((title: string) => {
		if (title) {
			workspaces.update(id, { title });
		}
	}, 1000);

	const onChange = useCallback(
		(val: string) => {
			updateApi(val);
			workspaceProxy.title = val;
		},
		[updateApi],
	);

	return <TextInput value={title} onChange={e => onChange(e.target.value)} />;
};

export const WorkspaceShell: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<AppShell
			styles={{
				body: { padding: 0 },
				main: {
					padding: 0,
					paddingTop: HEADER_HEIGHT,
				},
			}}
			header={
				<Header height={HEADER_HEIGHT} sx={{ display: 'flex', flex: 1 }}>
					<Group
						px="lg"
						sx={{
							flex: 1,
						}}
					>
						<Group position="left" sx={{ flex: 1 }}>
							<Link href={ROUTES.home}>
								<Group spacing={12}>
									<IconAperture size={28} />
								</Group>
							</Link>
						</Group>
						<Group position="center" sx={{ flex: 1 }}>
							<WorkspaceTitle />
						</Group>
						<Group position="right" sx={{ flex: 1 }}>
							<WorkspaceOptions />
						</Group>
					</Group>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
};
