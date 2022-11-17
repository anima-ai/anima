import { createStyles, Group, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconPlus } from '@tabler/icons';
import { FC, useMemo } from 'react';

import { useMentions } from '../../hooks';

interface Props {
	nodeId: string;
}

const useStyles = createStyles((_theme, _params, getRef) => ({
	controls: {
		ref: getRef('controls'),
		transition: 'opacity 150ms ease',
		opacity: 0,
	},

	root: {
		'&:hover': {
			[`& .${getRef('controls')}`]: {
				opacity: 1,
			},
		},
	},
}));

export const VariablesList: FC<Props> = ({ nodeId }) => {
	const [, tags] = useMentions(nodeId);

	const ordered = useMemo(() => {
		return tags.sort((a, b) => (a.value.includes('Input') ? -1 : 1));
	}, [tags]);
	const { classes } = useStyles();

	return (
		<Group
			px="md"
			pb="lg"
			sx={{
				position: 'absolute',
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 1,
				overflowX: 'auto',
				width: '100%',
			}}
		>
			<Carousel
				dragFree
				align="start"
				sx={{ width: '100%' }}
				styles={{
					control: {
						'&[data-inactive]': {
							opacity: 0,
							cursor: 'default',
						},
					},
				}}
				slideGap="sm"
				classNames={classes}
			>
				{ordered.map((tag, i) => (
					<Carousel.Slide key={`tag-z-${i}`} size="auto">
						<Group
							spacing={6}
							px="8px"
							py="3px"
							sx={theme => ({
								backgroundColor: theme.colors.gray[2],
								borderRadius: theme.radius.sm,
							})}
						>
							<IconPlus color="gray" size={20} />
							<Text color="gray.7">{tag.value}</Text>
						</Group>
					</Carousel.Slide>
				))}
			</Carousel>
		</Group>
	);
};
