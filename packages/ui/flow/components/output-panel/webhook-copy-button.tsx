import { ActionIcon, CopyButton, TextInput } from '@mantine/core';
import { outputProxy } from '@anima/core';
import { IconCopy } from '@tabler/icons';
import { useSnapshot } from 'valtio';

const getCurl = (id: string) => {
	return `curl -H "Content-type: application/json" -d '{
        "data": "<Your input data here>"
      }' 'WIP/live-chain/run?id=${id}'`;
};

export const WebhookCopyButton = () => {
	const { id } = useSnapshot(outputProxy);

	return (
		<CopyButton value="WIP">
			{({ copied, copy }) => (
				<TextInput
					label="Webhook trigger URL"
					description="Triggers the webhook when the output is computed"
					disabled
					value={`WIP`}
					rightSection={
						<ActionIcon onClick={copy}>
							<IconCopy size={20} />
						</ActionIcon>
					}
				/>
			)}
		</CopyButton>
	);
};
