/* eslint-disable valtio/state-snapshot-rule */
import { outputProxy } from '@anima/core';
import { useSnapshot } from 'valtio';
import { isEmpty } from 'ramda';
import useDebouncedEffect from 'use-debounced-effect';
import { outputNodes } from '@anima/supabase';
import { HeaderKeysEnum } from '@anima/constants';
import {
	ActionIcon,
	Button,
	Group,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';
import { IconCircleMinus, IconPlus } from '@tabler/icons';

export const HeaderSettings = () => {
	const { headers, id } = useSnapshot(outputProxy);

	const onCreateHeader = () => {
		outputProxy.headers = [...headers, { key: '', value: '' }];
	};

	const onSetHeaderKey = (index: number, key: string) => {
		outputProxy.headers[index].key = key;
	};

	const onSetHeaderValue = (index: number, value: string) => {
		outputProxy.headers[index].value = value;
	};

	const onDeleteHeader = (index: number) => {
		outputProxy.headers.splice(index, 1);
	};

	useDebouncedEffect(
		() => {
			const _headers = [
				...headers.filter(({ key, value }) => !isEmpty(key) && !isEmpty(value)),
			];

			if (!isEmpty(_headers)) {
				outputNodes.update(id, { headers: _headers });
			}
		},
		1000,
		[headers],
	);

	return (
		<Stack>
			{headers.map((header, index) => (
				<Group key={`$webhook-headers-${index}`}>
					<Select
						label="Key"
						searchable
						data={Object.values(HeaderKeysEnum)}
						value={header.key}
						onChange={e => onSetHeaderKey(index, e!)}
					/>
					<TextInput
						value={header.value}
						onChange={e => onSetHeaderValue(index, e.currentTarget.value)}
						label="Value"
						placeholder="value"
					/>
					<ActionIcon mt="md" onClick={() => onDeleteHeader(index)}>
						<IconCircleMinus size={24} />
					</ActionIcon>
				</Group>
			))}
			<Button
				variant="outline"
				leftIcon={<IconPlus size={20} />}
				onClick={onCreateHeader}
			>
				Create new header
			</Button>
		</Stack>
	);
};
