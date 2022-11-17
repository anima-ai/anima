import { FC, useCallback, useState } from 'react';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconFile, IconUpload, IconX } from '@tabler/icons';

interface Props {
	onDrop: DropzoneProps['onDrop'];
}

export const DropZone: FC<Props> = ({ onDrop }) => {
	const theme = useMantineTheme();
	const [loading, setLoading] = useState(false);

	const _onDrop = useCallback(
		async files => {
			try {
				setLoading(true);
				await onDrop(files);
			} finally {
				setLoading(false);
			}
		},
		[onDrop],
	);

	return (
		<Dropzone
			loading={loading}
			onDrop={_onDrop}
			onReject={files => console.log('rejected files', files)}
			maxSize={3 * 1024 ** 2}
			accept={['text/plain']}
		>
			<Group
				position="center"
				spacing="xl"
				style={{ minHeight: 150, pointerEvents: 'none' }}
			>
				<Dropzone.Accept>
					<IconUpload
						size={50}
						stroke={1.5}
						color={
							theme.colors[theme.primaryColor][
								theme.colorScheme === 'dark' ? 4 : 6
							]
						}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX
						size={50}
						stroke={1.5}
						color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconFile size={50} stroke={1.5} />
				</Dropzone.Idle>
				<div>
					<Text size="xl" inline>
						Drag txt files here or click to select files
					</Text>
					<Text size="sm" color="dimmed" inline mt={7}>
						Attach as many files as you like, each file should not exceed 5mb
					</Text>
				</div>
			</Group>
		</Dropzone>
	);
};
