import {
	ActionIcon,
	AppShell,
	Group,
	Header,
	Modal,
	Tooltip,
	Tabs,
	Box,
} from '@mantine/core';
import { IconX } from '@tabler/icons';

import { useActionSheet } from '@anima/core';

import { PromptIcon } from '../nodes';
import { PromptEditor } from './prompt-editor';
import { PromptSettings } from './prompt-settings';
import PromptResult from './prompt-result';
import { PromptActions } from './prompt-actions';
import { TogglePreview } from './toggle-preview';
import { PromptLabel } from './prompt-label';
import { ChunkingTab } from './chunking-tab';

const HEADER_HEIGHT = 60;

export const PromptPanel = () => {
	const { visible, onHide, nodeId } = useActionSheet();

	return (
		<Modal
			fullScreen
			withCloseButton={false}
			opened={visible}
			onClose={onHide}
			styles={{
				body: {
					display: 'flex',
					flex: 1,
					flexDirection: 'row',
					height: '100%',
				},
			}}
			padding={0}
		>
			{visible && (
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
								<Group spacing="xs">
									<PromptIcon size="lg" radius="md" onClick={() => {}} />
									<PromptLabel nodeId={nodeId} />
									<TogglePreview />
								</Group>
								<Group spacing="xs">
									<PromptActions nodeId={nodeId} />

									<Tooltip label="Minimize">
										<ActionIcon size="lg" variant="light" onClick={onHide}>
											<IconX />
										</ActionIcon>
									</Tooltip>
								</Group>
							</Group>
						</Header>
					}
				>
					<Box
						sx={theme => ({
							display: 'flex',
							flex: 1,
							height: '10vh,',
							width: '100vw',
							overflowY: 'hidden',
							borderBottom: `1px solid ${theme.colors.gray[4]}`,
						})}
					>
						<Group sx={{ flex: 1 }}>
							<PromptEditor nodeId={nodeId} />
						</Group>
						<Group sx={{ flex: 1 }}>
							<PromptResult nodeId={nodeId} />
						</Group>
					</Box>

					<Tabs
						defaultValue="chunking"
						radius="sm"
						styles={{ tabsList: { borderWidth: 0 } }}
					>
						<Tabs.List>
							<Tabs.Tab value="chunking">Chunking</Tabs.Tab>
							<Tabs.Tab value="settings">Settings</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value="chunking" pt="xs">
							<ChunkingTab nodeId={nodeId} />
						</Tabs.Panel>

						<Tabs.Panel value="settings" pt="xs">
							<PromptSettings nodeId={nodeId} />
						</Tabs.Panel>
					</Tabs>
				</AppShell>
			)}
		</Modal>
	);
};

export default PromptPanel;
