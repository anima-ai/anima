import { Stack } from '@mantine/core';
import { FC } from 'react';

import { BestOfControls } from './best-of-controls';
import { FrequencyPenaltyControls } from './frequency-penalty-controls';
import { ModelSelector } from './model-selector';
import { PresencePenaltyControls } from './presence-penalty-controls';
import { useSaveSettings } from './use-save-settings';
import { StopsControls } from './stops-controls';
import { TemperatureControls } from './temperature-controls';
import { TokensControls } from './tokens-controls';
import { TopPControls } from './top-p-controls';

interface Props {
	nodeId: string;
}

export const PromptSettings: FC<Props> = ({ nodeId }) => {
	useSaveSettings(nodeId);

	return (
		<Stack p="lg" sx={{ maxWidth: 400 }}>
			{/* <PromptDescription nodeId={nodeId} /> */}
			<Stack spacing="xs">
				<ModelSelector nodeId={nodeId} />
				<TemperatureControls nodeId={nodeId} />
				<TokensControls nodeId={nodeId} />
				<StopsControls nodeId={nodeId} />
				<TopPControls nodeId={nodeId} />
				<FrequencyPenaltyControls nodeId={nodeId} />
				<PresencePenaltyControls nodeId={nodeId} />
				<BestOfControls nodeId={nodeId} />
			</Stack>
		</Stack>
	);
};
