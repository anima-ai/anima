import { Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { QueryKey, ROUTES } from '@anima/constants';
import { workspaces } from '@anima/supabase';

export const CreateButton = () => {
	const { push } = useRouter();
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useMutation(
		() => {
			return workspaces.create();
		},
		{
			onSuccess: data => {
				queryClient.invalidateQueries([QueryKey.Workspaces]);
				setTimeout(() => {
					push(`${ROUTES.workspace}/${data?.id ?? ''}`);
				}, 500);
			},
		},
	);

	return (
		<Button loading={isLoading} mr="xs" onClick={() => mutate()}>
			Create
		</Button>
	);
};
