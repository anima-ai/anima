import { Avatar, Menu } from '@mantine/core';
import { supabase } from '@anima/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import React, { PropsWithChildren, useCallback } from 'react';

const OptionsMenu: React.FC<PropsWithChildren> = ({ children }) => {
	const signOut = useCallback(async () => {
		await supabase.auth.signOut();
	}, []);
	return (
		<Menu width={120}>
			<Menu.Target>{children}</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={signOut}>Sign out</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export const ProfileAvatar = () => {
	const user = useUser();

	if (user?.user_metadata.avatar_url) {
		return (
			<OptionsMenu>
				<Avatar
					src={user?.user_metadata.avatar_url}
					alt={user.user_metadata.full_name ?? ''}
					size="md"
					radius="xl"
				/>
			</OptionsMenu>
		);
	}

	return (
		<OptionsMenu>
			<Avatar size="md" radius="xl" color="green">
				{user?.user_metadata?.full_name?.[0].toUpperCase() ?? 'AI'}
			</Avatar>
		</OptionsMenu>
	);
};
