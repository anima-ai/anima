import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { FC, PropsWithChildren } from 'react';

export const ThemeProvider: FC<PropsWithChildren<any>> = ({ children }) => {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: 'Inter',
				fontFamilyMonospace: 'JetBrains Mono',

				components: {
					Text: {
						styles: {
							root: {
								fontFamily: 'JetBrains Mono',
								fontWeight: 'normal',
							},
						},
					},
					Slider: {
						defaultProps: {
							thumbSize: 20,
							size: 'xs',
							color: 'gray.6',
						},
						styles: theme => ({
							bar: { backgroundColor: theme.colors.gray[7] },
							thumb: {
								height: 16,
								width: 16,
								backgroundColor: theme.white,
								borderWidth: 1,
								boxShadow: theme.shadows.sm,
							},
						}),
					},
				},
				defaultRadius: 'md',
				colors: {
					// give the rest of the colors
					green: [
						'#C7F9DA',
						'#92F4C0',
						'#59DEA4',
						'#2FBE8D',
						'#00936F',
						'#00936F',
						'#00936F',
						'#00936F',
						'#00936F',
						'#00936F',
					],
				},
				primaryColor: 'green',
				primaryShade: 6,
				headings: {
					fontFamily: 'Inter',
					fontWeight: '500',
					sizes: {
						h6: {
							fontWeight: '600',
							fontSize: 14,
						},
						h5: {
							fontWeight: '400',
							fontSize: 16,
						},
						h4: {
							fontWeight: '500',
							fontSize: 18,
						},
						h3: {
							fontWeight: '400',
							fontSize: 20,
						},
					},
				},
			}}
		>
			<NotificationsProvider>{children}</NotificationsProvider>
		</MantineProvider>
	);
};
