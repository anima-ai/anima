import { timeFromNow, FilesLibraryShell, DropZone } from '@anima/ui';
import { Title, Box, Table, Text, ActionIcon, Menu } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { supabase } from '@anima/supabase';
import type { FileObject } from '@supabase/storage-js';
import { IconDots } from '@tabler/icons';
import { saveAs } from 'file-saver';

const bytesToKb = (size: number) => {
	const s = size / 1024;
	return `${s.toFixed(2)} KB`;
};

export const FileOptions = ({
	name,
	refetch,
}: {
	name: string;
	refetch: any;
}) => {
	const onDelete = useCallback(async () => {
		const user = await supabase.auth.getUser();
		const { data, error } = await supabase.storage
			.from(`files-${user.data.user.id}`)
			.remove([name]);

		if (error) {
			showNotification({
				title: 'Error',
				message: error.message,
				color: 'red',
			});
		} else {
			refetch();
		}
	}, [name, refetch]);

	const onDownload = useCallback(async () => {
		const user = await supabase.auth.getUser();
		const { data, error } = await supabase.storage
			.from(`files-${user.data.user.id}`)
			.download(name);
		if (data) {
			saveAs(data, name);
		}
	}, [name]);

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon>
					<IconDots />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={onDownload}>Download</Menu.Item>
				<Menu.Item onClick={onDelete}>Delete</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default function FilesLibraryPage() {
	const [items, setItems] = useState<FileObject[]>([]);

	const getBucket = useCallback(async () => {
		const user = await supabase.auth.getUser();
		const { data, error } = await supabase.storage
			.from(`files-${user.data.user.id}`)
			.list();

		if (error) {
			showNotification({
				title: 'Error',
				message: 'error fetching files',
				color: 'red',
			});
		} else {
			setItems(data);
		}
	}, []);

	useEffect(() => {
		getBucket();
	}, [getBucket]);

	const rows = useMemo(() => {
		return (
			items.map?.(({ id, created_at, updated_at, name, metadata }) => (
				<tr key={`files-library-row-${id}`}>
					<td>
						<Title order={5}>{name}</Title>
					</td>
					<td>
						<Text>{bytesToKb(metadata.size)}</Text>
					</td>
					<td>
						<Text>{timeFromNow(created_at)}</Text>
					</td>
					<td>
						<Text>{timeFromNow(updated_at)}</Text>
					</td>
					<td>
						<FileOptions name={`${name}`} refetch={getBucket} />
					</td>
				</tr>
			)) || []
		);
	}, [items, getBucket]);

	return (
		<FilesLibraryShell>
			<Box pl="xl" pt="lg">
				<Title order={3}>Files library</Title>
				<DropZone
					onDrop={async files => {
						const user = await supabase.auth.getUser();

						files.forEach(async file => {
							const { error } = await supabase.storage
								.from(`files-${user.data.user.id}`)
								.upload(`./${file.name}`, file);
							if (error) {
								showNotification({
									title: 'Error',
									message: 'error uploading file',
									color: 'red',
								});
							} else {
								getBucket();
							}
						});
					}}
				/>
				<Table verticalSpacing="lg">
					<thead>
						<tr>
							<th>
								<Text>Name</Text>
							</th>
							<th>Size</th>
							<th>
								<Text>Created At</Text>
							</th>
							<th>
								<Text>Updated At</Text>
							</th>
							<th />
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</Box>
		</FilesLibraryShell>
	);
}

FilesLibraryPage.auth = true;
