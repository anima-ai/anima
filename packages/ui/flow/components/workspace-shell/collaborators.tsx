import { Avatar, Group } from '@mantine/core';

export const Collaborators = () => {
	return (
		<Group>
			<Avatar radius="xl" color="teal">
				RS
			</Avatar>
			<Avatar radius="xl" color="indigo">
				TS
			</Avatar>
			<Avatar radius="xl" color="grape">
				MR
			</Avatar>
		</Group>
	);
};
