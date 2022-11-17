import { useCallback } from 'react';
import {
	ActionIcon,
	AppShell,
	Group,
	Header,
	Modal,
	Tooltip,
	Tabs,
	Box,
	Divider,
	Stack,
} from '@mantine/core';
import { IconX } from '@tabler/icons';

import { outputProxy } from '@anima/core';

import { useSnapshot } from 'valtio';
import { OutputIcon } from '../nodes/output-node/output-icon';
import { OutputEditor } from './output-editor';
import { OutputActions } from './output-actions';
import { OutputLabel } from './output-label';
import { HeaderSettings } from './headers-settings';
import { WebhookUrlInput } from './webhook-url-input';
import { WebhookPWInput } from './webhook-pw-input';
import { WebhookEnabledSwitch } from './webhook-enabled-switch';
import { WebhookCopyButton } from './webhook-copy-button';

const HEADER_HEIGHT = 60;

export const OutputPanel = () => {
	const { visible, id } = useSnapshot(outputProxy);

	const onHide = useCallback(() => {
		outputProxy.visible = false;
	}, []);

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
									<OutputIcon size="lg" radius="md" onClick={() => {}} />
									<OutputLabel nodeId={id} />
								</Group>
								<Group spacing="xs">
									<OutputActions nodeId={id} />

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
							height: `calc(100vh - ${HEADER_HEIGHT}px)`,
							width: '100vw',
							overflowY: 'hidden',
							borderBottom: `1px solid ${theme.colors.gray[4]}`,
						})}
					>
						<OutputEditor nodeId={id} />

						<Divider orientation="vertical" mr="sm" />
						<Group sx={{ alignItems: 'flex-start', width: '480px' }}>
							<Tabs
								variant="default"
								defaultValue="general"
								radius="sm"
								styles={{ tabsList: { borderWidth: 0 } }}
							>
								<Tabs.List>
									<Tabs.Tab value="general">General</Tabs.Tab>
									<Tabs.Tab value="headers">Headers</Tabs.Tab>
								</Tabs.List>

								<Tabs.Panel value="general" pt="xs">
									<Stack mt="md">
										<WebhookCopyButton />
										<WebhookUrlInput />
										<WebhookPWInput />
										<WebhookEnabledSwitch />
									</Stack>
								</Tabs.Panel>
								<Tabs.Panel value="headers" pt="xs">
									<Group
										sx={{
											height: '20vh',
											alignItems: 'flex-start',
										}}
										px="md"
										pb="xl"
									>
										<HeaderSettings />
									</Group>
								</Tabs.Panel>
							</Tabs>
						</Group>
					</Box>
				</AppShell>
			)}
		</Modal>
	);
};

export default OutputPanel;
