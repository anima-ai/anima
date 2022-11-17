import { FC } from 'react';
import { Box, BoxProps } from '@mantine/core';

export const NodeSection: FC<BoxProps> = ({ children, ...rest }) => {
	return (
		<Box px="xs" py="6px" {...rest}>
			{children}
		</Box>
	);
};
