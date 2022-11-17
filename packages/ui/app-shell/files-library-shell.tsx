/* eslint-disable no-useless-escape */
import { FC, PropsWithChildren } from 'react';
import { IconAperture } from '@tabler/icons';
import { IconSearch } from '@tabler/icons';
import {
	SpotlightAction,
	SpotlightProvider,
	openSpotlight,
} from '@mantine/spotlight';

import { AppShell, Button, Group, Header, Text, Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@anima/core';
import { ProfileAvatar } from './profile-avatar';

const HEADER_HEIGHT = 60;

const FilesLibraryShell: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<>
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
							position="apart"
							sx={{
								flex: 1,
							}}
						>
							<Group>
								<Link
									href={ROUTES.home}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<Group spacing={12}>
										<IconAperture size={28} />
										<Title order={4}>Anima</Title>
									</Group>
								</Link>
							</Group>
							<Button
								variant="outline"
								color="gray"
								radius="md"
								leftIcon={<IconSearch size={20} />}
								onClick={() => openSpotlight()}
							>
								<Text sx={{ marginRight: '100px' }}>Search</Text>
							</Button>
							<Group>
								<ProfileAvatar />
							</Group>
						</Group>
					</Header>
				}
			>
				{children}
			</AppShell>
		</>
	);
};

const actions: SpotlightAction[] = [
	{
		title: 'Home',
		description: 'Get to home page',
		onTrigger: () => console.log('Home'),
	},
	{
		title: 'Dashboard',
		description: 'Get full information about current system status',
		onTrigger: () => console.log('Dashboard'),
	},
	{
		title: 'Documentation',
		description: 'Visit documentation to lean more about all features',
		onTrigger: () => console.log('Documentation'),
	},
];

const Container: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<SpotlightProvider
			actions={actions}
			searchIcon={<IconSearch size={18} />}
			searchPlaceholder="Search..."
			shortcut="mod + K"
			nothingFoundMessage="Nothing found..."
		>
			<FilesLibraryShell>{children}</FilesLibraryShell>
		</SpotlightProvider>
	);
};

export default Container;
