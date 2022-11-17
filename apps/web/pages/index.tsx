import { AppShell, Dashboard } from '@anima/ui';
import { Title, Box } from '@mantine/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
	return (
		<AppShell>
			<Box pl="xl" pt="lg">
				<Title order={3}>Workspaces</Title>
				<Dashboard />
			</Box>
		</AppShell>
	);
}

export const getServerSideProps = async ctx => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};

	return { props: {} };
};
DashboardPage.auth = true;
