import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'reactflow/dist/style.css';

import { SupabaseProvider, ThemeProvider } from '../components';

const queryClient = new QueryClient();

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	return (
		<SupabaseProvider initialSession={pageProps.initialSession}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Anima</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
				</Head>

				<ThemeProvider>
					<Component {...pageProps} />
				</ThemeProvider>
			</QueryClientProvider>
		</SupabaseProvider>
	);
}
