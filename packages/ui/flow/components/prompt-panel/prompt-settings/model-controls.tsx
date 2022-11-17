import { SegmentedControl, Text, Tooltip } from '@mantine/core';
import { PromptModesEnum } from '@anima/core';
import { useMemo, useState } from 'react';
import {
	IconBlockquote,
	IconRowInsertTop,
	IconTextWrapDisabled,
} from '@tabler/icons';

export const ModeControl = ({ nodeId }: { nodeId: string }) => {
	const [value, setValue] = useState<string>(PromptModesEnum.Complete);

	const data = useMemo(
		() => [
			{
				label: (
					<Tooltip label={PromptModesEnum.Complete} withinPortal>
						<div>
							<IconBlockquote
								size={18}
								color={value === PromptModesEnum.Complete ? 'black' : 'gray'}
							/>
						</div>
					</Tooltip>
				),
				value: PromptModesEnum.Complete,
			},
			{
				label: (
					<Tooltip label={PromptModesEnum.Insert} withinPortal>
						<div>
							<IconRowInsertTop
								size={18}
								color={value === PromptModesEnum.Insert ? 'black' : 'gray'}
							/>
						</div>
					</Tooltip>
				),
				value: PromptModesEnum.Insert,
			},
			{
				label: (
					<Tooltip label={PromptModesEnum.Edit} withinPortal>
						<div>
							<IconTextWrapDisabled
								size={18}
								color={value === PromptModesEnum.Edit ? 'black' : 'gray'}
							/>
						</div>
					</Tooltip>
				),
				value: PromptModesEnum.Edit,
			},
		],
		[value],
	);

	return (
		<>
			<Text size="sm">Mode</Text>
			<SegmentedControl
				size="sm"
				value={value}
				onChange={setValue}
				styles={{ label: { zIndex: 99 }, labelActive: { zIndex: 99 } }}
				data={data}
			/>
		</>
	);
};
