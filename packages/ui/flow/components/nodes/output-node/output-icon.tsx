import { ActionIcon, MantineNumberSize } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { FC } from 'react';

interface Props {
	onClick: () => void;
	size?: MantineNumberSize;
	radius?: MantineNumberSize;
}

export const OutputIcon: FC<Props> = ({
	onClick,
	size = 'sm',
	radius = 'sm',
}) => {
	return (
		<ActionIcon
			size={size}
			radius={radius}
			variant="filled"
			color="orange"
			onClick={onClick}
		>
			<IconUpload />
		</ActionIcon>
	);
};
