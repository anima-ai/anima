import { ActionIcon, MantineNumberSize } from '@mantine/core';
import { IconCode } from '@tabler/icons';
import { FC } from 'react';

interface Props {
	onClick: () => void;
	size?: MantineNumberSize;
	radius?: MantineNumberSize;
}

export const PromptIcon: FC<Props> = ({
	onClick,
	size = 'sm',
	radius = 'sm',
}) => {
	return (
		<ActionIcon
			size={size}
			radius={radius}
			variant="filled"
			color="blue"
			onClick={onClick}
		>
			<IconCode />
		</ActionIcon>
	);
};
