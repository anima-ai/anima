// // @ts-nocheck
// import {
// 	ActionIcon,
// 	Drawer,
// 	Stack,
// 	Switch,
// 	Text,
// 	CopyButton,
// 	TextInput,
// 	Button,
// 	Group,
// 	Select,
// } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import useDebouncedEffect from 'use-debounced-effect';
// import { IconCopy } from '@tabler/icons';
// import { IconSettings, IconPlus, IconCircleMinus } from '@tabler/icons';
// import {
// 	BACKEND_BASE_URL,
// 	getAncestors,
// 	graph,
// 	inputProxy,
// 	nodesMap,
// } from '@anima/core';
// import { isEmpty } from 'ramda';
// import { Fragment, useEffect, useMemo, useState } from 'react';
// import useDeboucedEffect from 'use-debounced-effect';
// import { useSnapshot } from 'valtio';
// import { NodeType } from '@anima/api';
// import { useNode } from '../flow';

// enum HeaderKeysEnum {
// 	'A-IM' = 'A-IM',
// 	'Accept' = 'Accept',
// 	'Accept-Charset' = 'Accept-Charset',
// 	'Accept-Datetime' = 'Accept-Datetime',
// 	'Accept-Encoding' = 'Accept-Encoding',
// 	'Accept-Language' = 'Accept-Language',
// 	'Access-Control-Request-Headers' = 'Access-Control-Request-Headers',
// 	'Access-Control-Request-Method' = 'Access-Control-Request-Method',
// 	'Authorization' = 'Authorization',
// 	'Cache-Control' = 'Cache-Control',
// 	'Connection' = 'Connection',
// 	'Content-Length' = 'Content-Length',
// 	'Content-Type' = 'Content-Type',
// 	'Cookie' = 'Cookie',
// 	'Date' = 'Date',
// 	'Expect' = 'Expect',
// 	'Forwarded' = 'Forwarded',
// 	'From' = 'From',
// 	'Host' = 'Host',
// 	'If-Match' = 'If-Match',
// 	'If-Modified-Since' = 'If-Modified-Since',
// 	'If-None-Match' = 'If-None-Match',
// 	'If-Range' = 'If-Range',
// 	'If-Unmodified-Since' = 'If-Unmodified-Since',
// 	'Max-Forwards' = 'Max-Forwards',
// 	'Origin' = 'Origin',
// 	'Pragma' = 'Pragma',
// 	'Proxy-Authorization' = 'Proxy-Authorization',
// 	'Range' = 'Range',
// 	'Referer' = 'Referer',
// 	'TE' = 'TE',
// 	'Trailer' = 'Trailer',
// 	'Transfer-Encoding' = 'Transfer-Encoding',
// 	'Upgrade' = 'Upgrade',
// 	'User-Agent' = 'User-Agent',
// 	'Via' = 'Via',
// 	'Warning' = 'Warning',
// }

// const getCurl = (id: string) => {
// 	return `curl -H "Content-type: application/json" -d '{
//         "data": "<Your input data here>"
//       }' '${BACKEND_BASE_URL}/live-chain/run?id=${id}'`;
// };

// const CopyInputUrl = ({ id }: { id: string }) => {
// 	return (
// 		<CopyButton value="https://api.sansai.io/live-chain/run?id=2">
// 			{({ copied, copy }) => (
// 				<TextInput
// 					label="URL"
// 					disabled
// 					value={`${BACKEND_BASE_URL}/live-chain/run?id=${id}`}
// 					rightSection={
// 						<ActionIcon onClick={copy}>
// 							<IconCopy size={20} />
// 						</ActionIcon>
// 					}
// 				/>
// 			)}
// 		</CopyButton>
// 	);
// };

// const SendSwitch = ({ id }: { id: string }) => {
// 	const { node } = useNode(id);
// 	const [checked, setChecked] = useState(node?.data?.send);

// 	useEffect(() => {
// 		if (checked !== null && checked !== undefined) {
// 			const _node = nodesMap.get(id)!;
// 			_node.data.send = checked;
// 			// updateNodeApz(id, { send: checked });
// 		}
// 	}, [checked, id]);

// 	return (
// 		<Switch
// 			onLabel="ON"
// 			offLabel="OFF"
// 			size="lg"
// 			color="indigo"
// 			label={node?.data?.label}
// 			checked={!!checked}
// 			onChange={e => setChecked(e.currentTarget.checked)}
// 		/>
// 	);
// };

// export const HeaderSettings = () => {
// 	const { headers: _headers } = useSnapshot(inputProxy);
// 	const [headers, setHeaders] = useState<readonly Record<string, string>[]>(
// 		_headers ?? [],
// 	);

// 	const onCreateHeader = () => {
// 		setHeaders([...headers, { key: '', value: '' }]);
// 	};

// 	const onSetHeaderKey = (index: number, key: string) => {
// 		const newHeaders = [...headers];
// 		newHeaders[index].key = key;
// 		setHeaders(newHeaders);
// 	};

// 	const onSetHeaderValue = (index: number, value: string) => {
// 		const newHeaders = [...headers];
// 		newHeaders[index].value = value;
// 		setHeaders(newHeaders);
// 	};

// 	const onDeleteHeader = (index: number) => {
// 		const newHeaders = [...headers];
// 		newHeaders.splice(index, 1);
// 		setHeaders(newHeaders);
// 	};

// 	useDebouncedEffect(
// 		() => {
// 			if (!isEmpty(headers)) {
// 				updateChainAsync({ headers });
// 			}
// 		},
// 		1000,
// 		[headers],
// 	);

// 	return null;
// 	// eslint-disable-next-line no-unreachable
// 	return (
// 		<>
// 			{headers.map((header, index) => (
// 				<Group key={`$webhook-headers-${index}`}>
// 					<Select
// 						label="Key"
// 						searchable
// 						data={Object.values(HeaderKeysEnum)}
// 						value={header.key}
// 						onChange={e => onSetHeaderKey(index, e!)}
// 					/>
// 					<TextInput
// 						value={header.value}
// 						onChange={e => onSetHeaderValue(index, e.currentTarget.value)}
// 						label="Value"
// 						placeholder="value"
// 					/>
// 					<ActionIcon
// 						color="indigo"
// 						mt="md"
// 						onClick={() => onDeleteHeader(index)}
// 					>
// 						<IconCircleMinus size={24} />
// 					</ActionIcon>
// 				</Group>
// 			))}
// 			<Button
// 				variant="outline"
// 				leftIcon={<IconPlus size={20} />}
// 				onClick={onCreateHeader}
// 			>
// 				Create new header
// 			</Button>
// 		</>
// 	);
// };

export const OutputSettings = () => {
	return null;
	// const [opened, handler] = useDisclosure(false);
	// const { id, webhook } = useSnapshot(inputProxy);
	// const nodes = Array.from(useSnapshot(nodesMap).values());

	// const [val, setVal] = useState(webhook || '');

	// const inputNodes = useMemo(
	// 	() => nodes.filter(e => e.type === NodeType.INPUT),
	// 	[nodes],
	// );

	// const path = useMemo(() => {
	// 	const start = inputNodes?.[0]?.id!;
	// 	if (!start) return [];
	// 	if (!graph.hasNode(start)) return [];

	// 	return getAncestors(start).filter(i => nodes.find(e => e.id === i)!);
	// }, [inputNodes, nodes]);

	// useEffect(() => {
	// 	if (isEmpty(val) && !isEmpty(webhook)) {
	// 		setVal(webhook || '');
	// 	}
	// }, [val, webhook]);

	// useDeboucedEffect(
	// 	() => {
	// 		if (val) {
	// 			updateChainAsync({ webhook: val });
	// 		}
	// 	},
	// 	{ ignoreInitialCall: true, timeout: 1500 },
	// 	[val],
	// );

	// return (
	// 	<ActionIcon variant="light" size="lg" onClick={handler.open}>
	// 		<IconSettings />
	// 	</ActionIcon>
	// );
	// // eslint-disable-next-line no-unreachable
	// return (
	// 	<>
	// 		<Drawer
	// 			position="right"
	// 			opened={opened}
	// 			title="Deployment Settings"
	// 			styles={{
	// 				title: {
	// 					margin: '12px 0 0 12px',
	// 					fontWeight: 'normal',
	// 					fontSize: '24px',
	// 				},
	// 				closeButton: {
	// 					marginRight: '8px',
	// 				},
	// 			}}
	// 			onClose={handler.close}
	// 			size="xl"
	// 		>
	// 			<Stack px="lg" py="sm">
	// 				<Text>Input</Text>

	// 				<CopyInputUrl id={id} />
	// 				<CopyButton key="adasd" value={getCurl(id)}>
	// 					{({ copied, copy }) => (
	// 						<Button color={copied ? 'teal' : 'indigo'} onClick={copy}>
	// 							{copied ? 'Copied!' : 'Copy curl command to clipboard'}
	// 						</Button>
	// 					)}
	// 				</CopyButton>

	// 				<Text>Output</Text>
	// 				{id && (
	// 					<>
	// 						<TextInput
	// 							sx={{ width: 300 }}
	// 							label="Webhook URL"
	// 							placeholder="webhook url e.g https://webhook.site/..."
	// 							value={val}
	// 							onChange={e => setVal(e.currentTarget.value)}
	// 						/>
	// 						<HeaderSettings />
	// 					</>
	// 				)}
	// 				<Text>Prompts outputs to be sent in webhook</Text>
	// 				{path.map(e => (
	// 					<Fragment key={`settings-send-${e}`}>
	// 						<SendSwitch id={e} />
	// 					</Fragment>
	// 				))}
	// 			</Stack>
	// 		</Drawer>

	// 		<ActionIcon variant="light" size="lg" onClick={handler.open}>
	// 			<IconSettings />
	// 		</ActionIcon>
	// 	</>
	// );
};
