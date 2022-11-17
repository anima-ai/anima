import { Chip, Table, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';

import { useWorkpacesQuery } from '@anima/hooks';
import { ROUTES, workspacesProxy } from '@anima/core';

import { timeFromNow } from '../utils';
import { ItemOptions } from './item-options';

export const Dashboard = () => {
	const { push } = useRouter();
	useWorkpacesQuery();

	const workspaces = useSnapshot(workspacesProxy);

	const rows = useMemo(() => {
		return (
			workspaces.filtered?.map?.(
				({ id, title, created_at, owner, is_public }) => (
					<tr key={`dashboard-row-${id}`}>
						<td
							onClick={() => {
								push(`${ROUTES.workspace}/${id ?? ''}`);
							}}
						>
							<Title order={5}>{title}</Title>
						</td>
						<td>
							<Chip sx={{ pointerEvents: 'none' }}>
								<Text>{is_public ? 'PUBLIC' : 'PRIVATE'}</Text>
							</Chip>
						</td>
						<td>
							<Text>{owner?.email ?? 'anon'}</Text>
						</td>
						<td>
							<Text>{timeFromNow(created_at)}</Text>
						</td>
						<td>
							<ItemOptions id={id} />
						</td>
					</tr>
				),
			) || []
		);
	}, [workspaces.filtered, push]);

	return (
		<Table verticalSpacing="lg" highlightOnHover>
			<thead>
				<tr>
					<th>
						<Text>Title</Text>
					</th>
					<th>
						<Text>Type</Text>
					</th>
					<th>
						<Text>Owner</Text>
					</th>
					<th>
						<Text>Created</Text>
					</th>
					<th>
						<Text>Options</Text>
					</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
