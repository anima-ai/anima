import { ActionIcon, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconLetterT, IconCode, IconFiles, IconUpload } from '@tabler/icons';
import { ROUTES } from '@anima/constants';
import Link from 'next/link';
import { NodeType } from '@anima/core';

export const Sidebar = () => {
	const onDragStart = (event: any, nodeType: any) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
	const { ref, width } = useElementSize();

	return (
		<Paper
			ref={ref}
			sx={theme => ({
				position: 'absolute',
				bottom: 32,
				left: `calc(50vw - ${width / 1.5}px)`,
				zIndex: 99,
				outlineColor: theme.colors.indigo[5],
			})}
			px="lg"
			py="md"
			radius="md"
			shadow="lg"
		>
			<Group spacing="lg">
				<Stack spacing="xs" align="center">
					<Tooltip label="Prompt">
						<ActionIcon
							variant="filled"
							color="blue"
							size="xl"
							p="4px"
							onDragStart={(event: any) => onDragStart(event, NodeType.PROMPT)}
							draggable
						>
							<IconCode size={44} />
						</ActionIcon>
					</Tooltip>
					<Text size="sm">Prompt</Text>
				</Stack>
				<Stack spacing="xs" align="center">
					<Tooltip label="Text">
						<ActionIcon
							variant="filled"
							color="pink"
							size="xl"
							p="4px"
							onDragStart={(event: any) => onDragStart(event, NodeType.COMMENT)}
							draggable
						>
							<IconLetterT size={44} />
						</ActionIcon>
					</Tooltip>
					<Text size="sm">Text</Text>
				</Stack>
				<Stack spacing="xs" align="center">
					<Tooltip label="Output">
						<ActionIcon
							variant="filled"
							color="orange"
							size="xl"
							p="4px"
							onDragStart={(event: any) => onDragStart(event, NodeType.OUTPUT)}
							draggable
						>
							<IconUpload size={44} />
						</ActionIcon>
					</Tooltip>
					<Text size="sm">Output</Text>
				</Stack>
				<Stack spacing="xs" align="center">
					<Tooltip label="Library">
						<Link href={ROUTES.filesLibrary}>
							<ActionIcon variant="filled" color="gray" size="xl" p="4px">
								<IconFiles size={44} />
							</ActionIcon>
						</Link>
					</Tooltip>
					<Text size="sm">Library</Text>
				</Stack>
			</Group>
		</Paper>
	);
};
